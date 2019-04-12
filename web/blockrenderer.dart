part of RWDK;

class BlockRenderer {
	int width;
	int height;
	CanvasElement canvas;
	CanvasRenderingContext2D ctx;
	bool showHardpoints = true;
	
	BlockRenderer(int this.width, int this.height) {
		this.canvas = new CanvasElement()..width = width..height = height;
		this.ctx = this.canvas.getContext("2d");
	}
	
	void clear() {
		this.ctx.clearRect(0, 0, width, height);
	}
	
	double calcScaling(List<Vertex> verts, int blockscale, [List<Vertex> outerverts = null]) {
		if (verts.isEmpty) { return 1.0; }
		int smallest = min(width,height);
		double scaling = 1.0;
		double far = 0.0;
		blockscale = min(10, blockscale);
		double farthest = 0.15 * smallest + blockscale*0.03 * smallest;
		
		double xmin = 2000000000.0;
		double xmax = -2000000000.0;
		double ymin = 2000000000.0;
		double ymax = -2000000000.0;
		
		for (Vertex v in verts) {
			//far = max(max(far, v.x.abs().toDouble()), v.y.abs().toDouble());
			
			xmin = min(xmin, v.x);
			xmax = max(xmax, v.x);
			ymin = min(ymin, v.y);
			ymax = max(ymax, v.y);
		}
		
		far = max((xmax-xmin).abs(), (ymax-ymin).abs())*0.5;
		
		if (far > 0) {
			scaling = min(smallest*0.75, farthest / far); 
		}
		
		if (outerverts != null) {
    		double ofar = 0.0;
    		for (Vertex v in outerverts) {
    			ofar = max(max(far, v.x.abs().toDouble()), v.y.abs().toDouble());
    		}

    		double omax = smallest * 0.5 * 0.9;
    		if (ofar * scaling > omax) {
    			scaling *= omax / (ofar*scaling);
    		}
		}

		return scaling;
	}
	
	void drawGrid(BlockShape shape, [int scale = 1]) {
		if (shape == null || shape.maxScale < 1) { return; }
		
		List<Vertex> vertices = shape.vertices[scale-1];
		double scaling = vertices.isEmpty ? 50.0 : calcScaling(vertices, scale);
		
		double sx = (width/scaling);
		double sy = (height/scaling);
		
		int nx = (sx*0.5 + 0.5).floor() * 2;
		int ny = (sy*0.5 + 0.5).floor() * 2;
		
		this.ctx.strokeStyle = "rgba(255,255,255,0.075)";
		
		for (int i = 0; i < nx; i++) {
			double x = ((this.width*0.5) +(i - (nx-1)*0.5)*scaling).floor() + 0.5;
			this.ctx
				..beginPath()
				..moveTo(x, 0)
				..lineTo(x, this.height)
				..stroke();
		}
		
		for (int i = 0; i < nx; i++) {
			double y = ((this.height*0.5) +(i - (ny-1)*0.5)*scaling).floor() + 0.5;
			this.ctx
				..beginPath()
				..moveTo(0, y)
				..lineTo(this.width, y)
				..stroke();
		}
		
		//print("b: ${shape.name}, w: ${width}, h: ${height}, scale: $scale, scaling: ${scaling}, nx: $nx, ny: $ny");
	}
	
	void drawBlockShape(BlockShape shape, {int scale : 1, double scaling : 0.0, double angle : 0.0, double xoffset : 0.0, double yoffset: 0.0, String colour1 : "#808080", String colour2 : null, String linecolour : null, bool bold : false, HardpointType highlight : null, bool invisible : false, bool recentre:false}) {
		if (shape == null || shape.maxScale < 1) { return; }
		if(scale > shape.maxScale) { shape = ShapeList.MISSING; }

		List<Vertex> vertices = shape.vertices[scale-1];
		List<Hardpoint> hardpoints = shape.hardpoints[scale-1];
		if (colour2 == null) { colour2 = colour1; }
		if (linecolour == null) { linecolour = colour1; }

		if (vertices.length <= 2) { return; }
		
		int smallest = min(width,height);
		double farthest = 0.15 * smallest + scale*0.03 * smallest;
		
		if (scaling == 0.0) {
			scaling = calcScaling(vertices, scale);
		}
		
		if (recentre) {
			double xmin = 2000000000.0;
    		double xmax = -2000000000.0;
    		double ymin = 2000000000.0;
    		double ymax = -2000000000.0;
    		
    		for (Vertex v in vertices) {
    			//far = max(max(far, v.x.abs().toDouble()), v.y.abs().toDouble());
    			
    			xmin = min(xmin, v.x);
    			xmax = max(xmax, v.x);
    			ymin = min(ymin, v.y);
    			ymax = max(ymax, v.y);
    		}
			
    		xoffset -= (xmin+xmax)*0.5;
    		yoffset -= (ymin+ymax)*0.5;
		}
		
		if (colour1 != colour2) {
			CanvasGradient grad = ctx.createLinearGradient(width*0.5 - farthest, height*0.5 - farthest, width*0.5 + farthest, height*0.5 + farthest);
			grad.addColorStop(0.0, colour1);
			grad.addColorStop(1.0, colour2);
			this.ctx.fillStyle = grad;
		} else {
			this.ctx.fillStyle = colour1;
		}
		this.ctx.strokeStyle = linecolour;

		//print("${shape.name} @ $scale: $scaling, v0: ${vertices[0].x}, ${vertices[0].y}");
		
		double ox = this.width * 0.5 + xoffset * scaling;
		double oy = this.height * 0.5 + yoffset * scaling; 
		
		double msin = sin(angle);
		double mcos = cos(angle);
		
		if (!invisible) {
			this.ctx.beginPath();
			bool first = true;
			for (Vertex v in vertices) {
				double x = v.x * mcos - v.y * msin;
				double y = v.x * msin + v.y * mcos;
				
				if (first) {
					first = false;
					this.ctx.moveTo(x * scaling + ox, y * scaling + oy);
				} else {
					this.ctx.lineTo(x * scaling + ox, y * scaling + oy);
				}
			}
			this.ctx
				..closePath()
				..fill()
				..stroke();
		}
		
		// centroid drawing
		/*Vertex centroid = shape.centroids[scale-1];
		double x = (centroid.x*scaling + ox).floor() + 0.5;
        double y = (centroid.y*scaling + oy).floor() + 0.5;
		this.ctx
			..beginPath()
			..strokeStyle = "#FFFFFF" 
			..strokeRect(x-2, y-2, 4, 4);*/
		
		/*bold = true;
		bool highlightfirst = true;*/
		if (showHardpoints) {
			//Map<HardpointType, String> cols = bold ? hardpointColoursBold : hardpointColours;
			for (Hardpoint p in hardpoints) {
				double mx = p.x * mcos - p.y * msin;
	            double my = p.x * msin + p.y * mcos;
				double x = (mx*scaling + ox).floor() + 0.5;
				double y = (my*scaling + oy).floor() + 0.5;
				
				HardpointType t = p.type;
				if (t.hardpointUI != null) {
    				t = t.hardpointUI;
    			}
    			/*if (hardpointUI.containsKey(t)) {
    				t = hardpointUI[t];
    			}*/
				
				this.ctx
					..beginPath()
					..strokeStyle = bold ? t.colourBold : t.colour
					//..strokeStyle = cols[t]
					..strokeRect(x-2, y-2, 4, 4);
					// normal visualisation
					/*..moveTo(x, y)
					..lineTo(x + p.normal.x * 16, y + p.normal.y * 16);*/
				
				/*if (highlightfirst) {
					highlightfirst = false;
					this.ctx
						..fillStyle=cols[t]
						..fillText("x", x+3, y+3);
				}*/
	
				if (highlight == t) {
					double os = 3.5;
					double oe = 7.5;
					this.ctx
						..moveTo(x-os,y)
						..lineTo(x-oe,y)
						
					    ..moveTo(x+os,y)
						..lineTo(x+oe,y)
						
						..moveTo(x,y-os)
						..lineTo(x,y-oe)
						
						..moveTo(x,y+os)
		                ..lineTo(x,y+oe)
	
				    	/*..moveTo(x-os,y-os)
		                ..lineTo(x-oe,y-oe)
		                ..moveTo(x-os,y+os)
		                ..lineTo(x-oe,y+oe)
		                ..moveTo(x+os,y-os)
		                ..lineTo(x+oe,y-oe)
		                ..moveTo(x+os,y+os)
	                    ..lineTo(x+oe,y+oe)*/;
				}
				
				this.ctx..stroke();
			}
		}
	}
	
	void drawBlock(ModuleBlock block, {double scaling: 0.0, double angle : 0.0, double xoffset : 0.0, double yoffset: 0.0}) {
		String name = (block.fields["name"] as FieldString).value;
		
		FieldShape fshape = (block.fields["shape"] as FieldShape);
		FieldInt fscale = (block.fields["scale"] as FieldInt);
		FieldColour fcol1 = (block.fields["fillColor"] as FieldColour);
		FieldColour fcol2 = (block.fields["fillColor1"] as FieldColour);
		FieldColour flinecol = (block.fields["lineColor"] as FieldColour);
		FieldEnum ffeatures = (block.fields["features"] as FieldEnum);
		FieldModule fshield = (block.fields["shield"] as FieldModule);
		FieldColour fshieldcol = (fshield.module.fields["color"] as FieldColour);
		FieldColour fshieldlinecol = (fshield.module.fields["lineColor"] as FieldColour);

		BlockShape shape = ShapeList.SQUARE;
		int scale = fscale.active ? fscale.value : 1;

		if (fshape.active) {
			shape = fshape.shape;
		}
		if (scale > shape.maxScale) {
			shape = ShapeList.MISSING;
		}
		print("module: ${shape.name} @ $scale");
		
		String col1 = fcol1.active ? fcol1.composeStyleString() : "#000000";
		String col2 = fcol2.active ? fcol2.composeStyleString() : fcol1.active ? col1 : "#800080";
		String linecol = flinecol.active ? flinecol.composeStyleString() : "#FFFFFF";
		
		String shieldcol = fshieldcol.active ? fshieldcol.composeStyleString() : "#FFFFFF";
		String shieldcol2 = fshieldcol.active ? "rgba(${fshieldcol.red},${fshieldcol.green},${fshieldcol.blue},0.0)" : "rgba(255,255,255,0)";
		String shieldlinecol = fshieldlinecol.active ? fshieldlinecol.composeStyleString(true) : fshieldcol.active ? fshieldcol.composeStyleString(true) : "#FFFFFF";
		
		List<Vertex> vertices = shape.vertices[scale-1];
		
		if (scaling == 0.0) {
			scaling = calcScaling(vertices, scale);
		}
		
		bool invisible = ffeatures.active && ffeatures.theEnum[EnumFeature.INVISIBLE];
		
		this.drawBlockShape(shape, scale:scale, scaling:scaling, angle:angle, xoffset:xoffset, yoffset:yoffset, colour1:col1, colour2:col2, linecolour:linecol, invisible:invisible);
		
		bool command = block.parent != null && ffeatures.active && ffeatures.theEnum[EnumFeature.COMMAND];
		bool tractor = ffeatures.active && ffeatures.theEnum[EnumFeature.TRACTOR];
		bool photosynth = ffeatures.active && ffeatures.theEnum[EnumFeature.PHOTOSYNTH];
		bool launcher = ffeatures.active && ffeatures.theEnum[EnumFeature.LAUNCHER];
		bool factory = ffeatures.active && ffeatures.theEnum[EnumFeature.FACTORY];
		bool generator = ffeatures.active && ffeatures.theEnum[EnumFeature.GENERATOR];
		bool turret = ffeatures.active && ffeatures.theEnum[EnumFeature.TURRET];
		bool laser = ffeatures.active && ffeatures.theEnum[EnumFeature.LASER];
		bool cannon = ffeatures.active && ffeatures.theEnum[EnumFeature.CANNON];
		bool shield = ffeatures.active && ffeatures.theEnum[EnumFeature.SHIELD];
		
		// modifiers
		if (command) {
			tractor = false;
			generator = false;
			factory = false;
			launcher = false;
		}
		
		if (factory) {
			tractor = false;
		}
		
		if (invisible) {
			command = false;
			tractor = false;
			photosynth = false;
			launcher = false;
			factory = false;
			generator = false;
		}
		
		if (launcher) {
			generator = false;
		}
		
		double msin = sin(angle);
        double mcos = cos(angle);
        
        Vertex centroid = shape.overlays[scale-1];
        Rotate r = new Rotate(angle);
        double size = shape.symbolscales[scale-1]*scaling*0.5;
        double ox = (xoffset + r.x(centroid.x, centroid.y)) * scaling + width*0.5;
        double oy = (yoffset + r.y(centroid.x, centroid.y)) * scaling + width*0.5;

        this.ctx.strokeStyle = linecol;
        
        var fill = this.ctx.fillStyle;
        
        if (command) {
        	String f1 = "rgba(${fcol1.red},${fcol1.green},${fcol1.blue},0.25)";
        	String f2 = "rgba(${fcol2.red},${fcol2.green},${fcol2.blue},0.25)";
        	
        	double f = 1/sqrt(2);
        	double s = size;
        	double o = sqrt(2)*0.5;
        	for (int i=0; i<3; i++) {
	        	this.ctx
	        		..fillStyle = f1
	        		..globalCompositeOperation = "lighter"
	        		..beginPath()
	        		..moveTo(ox + r.x(-s*o,-s*o), oy + r.y(-s*o,-s*o))
	        		..lineTo(ox + r.x(-s*o, s*o), oy + r.y(-s*o, s*o))
	        		..lineTo(ox + r.x( s*o, s*o), oy + r.y( s*o, s*o))
	        		..lineTo(ox + r.x( s*o,-s*o), oy + r.y( s*o,-s*o))
	        		..closePath()
	        		..fill()
	        		..fillStyle = f2
	        		..globalCompositeOperation = "source-over"
	        		..beginPath()
	        		..moveTo(ox + r.x(0,-s), oy + r.y(0,-s))
	        		..lineTo(ox + r.x(s, 0), oy + r.y(s, 0))
	        		..lineTo(ox + r.x(0, s), oy + r.y(0, s))
	        		..lineTo(ox + r.x(-s,0), oy + r.y(-s,0))
	        		..closePath()
	        		..fill();
	        	s *= f;
        	}
        }
        
        if (tractor) {
        	this.ctx
        		..beginPath()
        		..arc(ox, oy, size*0.66, 0, 2*PI)
        		..closePath()..stroke()
        		..beginPath()
        		..arc(ox, oy, size*0.33, 0, 2*PI)
        		..closePath()..stroke()
                ..beginPath()
        		..arc(ox, oy, size*0.2, 0, 2*PI)
        		..closePath()..stroke();
        }

        if (launcher) {
        	double lsize = size;
        	double len = 0.75;
        	this.ctx
        		..beginPath()
        		..moveTo(ox + r.x(-lsize*len, -lsize*2/3), oy + r.y(-lsize*len, -lsize*2/3))
        		..lineTo(ox + r.x(-lsize*len, lsize*2/3), oy + r.y(-lsize*len, lsize*2/3))
        		..lineTo(ox + r.x(lsize*len, 0), oy + r.y(lsize*len, 0))
        		..closePath()..stroke();
        }
        
        if (factory) {
        	double s = 0.9*size;
        	double o = sqrt(2)*0.5;
        	this.ctx..beginPath()
        		..moveTo(ox + r.x(0,-s), oy + r.y(0,-s))
        		..lineTo(ox + r.x(s, 0), oy + r.y(s, 0))
        		..lineTo(ox + r.x(0, s), oy + r.y(0, s))
        		..lineTo(ox + r.x(-s,0), oy + r.y(-s,0))
        		..closePath()
        		..stroke()
        		..beginPath()
        		..moveTo(ox + r.x(-s*o,-s*o), oy + r.y(-s*o,-s*o))
        		..lineTo(ox + r.x(-s*o, s*o), oy + r.y(-s*o, s*o))
        		..lineTo(ox + r.x( s*o, s*o), oy + r.y( s*o, s*o))
        		..lineTo(ox + r.x( s*o,-s*o), oy + r.y( s*o,-s*o))
        		..closePath()
        		..stroke();
        }

        if (generator) {
        	this.ctx
        		..beginPath()
        		..arc(ox, oy, size*0.5, PI/6 + angle, (PI/6*11) + angle)
				..stroke()
        		..beginPath()
        		..moveTo(ox, oy)
        		..lineTo(ox + r.x(size*0.6,0), oy + r.y(size*0.6,0))
        		..closePath()..stroke();
        }
        
        if (photosynth) {
			this.ctx.fillStyle = col2;

			Rotate r2 = new Rotate(angle + (PI*2/3));
			Rotate r3 = new Rotate(angle - (PI*2/3));
			
			double l = size*0.8;
			double w = size*0.3;
			this.ctx
				..beginPath()
				..moveTo(ox, oy)
				..lineTo(ox + r.x(-w, l), oy + r.y(-w, l))
				..lineTo(ox + r.x(w, l), oy + r.y(w, l))
				..closePath()..fill()..stroke();
			this.ctx
				..beginPath()
				..moveTo(ox, oy)
				..lineTo(ox + r2.x(-w, l), oy + r2.y(-w, l))
				..lineTo(ox + r2.x(w, l), oy + r2.y(w, l))
				..closePath()..fill()..stroke();
			this.ctx
				..beginPath()
				..moveTo(ox, oy)
				..lineTo(ox + r3.x(-w, l), oy + r3.y(-w, l))
				..lineTo(ox + r3.x(w, l), oy + r3.y(w, l))
				..closePath()..fill()..stroke();
        }
        
		if (turret && laser && !cannon) {
			FieldModule flaser = (block.fields["laser"] as FieldModule);
			FieldDouble fdamage = (flaser.module.fields["damage"] as FieldDouble);
			FieldDouble frange = (flaser.module.fields["range"] as FieldDouble);
			bool explodes = (flaser.module.fields["explosive"]).active;
			FieldDouble fexplode = (flaser.module.fields["explodeRadius"] as FieldDouble);
			
			double damage = fdamage.active ? fdamage.value : 1.0;
			double range = frange.active ? frange.value : 100.0;
			double explode = fexplode.active ? fexplode.value : 10.0;
			
			double damscale = damage * 0.01 * (8/33) * scaling;
			
			/*if (explodes) {
				damscale *= max(1.4, 0.31 * sqrt(explode));
			}*/

			double basescale = (min(damscale, size)*0.5).abs();
			double barrelwidth = (min(damscale*0.5, size)).abs();

			double barrellength = max(max(scaling*scale*0.25, (7/9) * size), range * 0.001 * 0.6 * scaling);
			
			this.ctx
				..fillStyle = fill
				..beginPath()
				..arc(ox, oy, basescale*2, 0, 2*PI)
				..closePath()..fill()..stroke();
			
			if (damage < 0) { 
				this.ctx.fillStyle = col2;
			}
			
			this.ctx
				..beginPath()
				..moveTo(ox + r.x(-basescale, -barrelwidth), oy + r.y(-basescale, -barrelwidth))
				..lineTo(ox + r.x(-basescale, barrelwidth), oy + r.y(-basescale, barrelwidth))
				..lineTo(ox + r.x(barrellength*2-basescale, 0), oy + r.y(barrellength*2-basescale, 0))
				..closePath()..fill()..stroke();
		}
		
		if (turret && cannon && !laser) {
			FieldModule fcannon = (block.fields["cannon"] as FieldModule);
			FieldDouble fdamage = (fcannon.module.fields["damage"] as FieldDouble);
			FieldDouble frof = (fcannon.module.fields["roundsPerSec"] as FieldDouble);
			FieldDouble fvel = (fcannon.module.fields["muzzleVel"] as FieldDouble);
			bool explodes = (fcannon.module.fields["explosive"]).active;
			FieldDouble fexplode = (fcannon.module.fields["explodeRadius"] as FieldDouble);
			
			double damage = fdamage.active ? fdamage.value : 1.0;
			double rof = frof.active ? frof.value : 1.0;
			double vel = fvel.active ? fvel.value : 100.0;
			double explode = fexplode.active ? fexplode.value : 10.0;
			
			double damscale = max(0.0, (sqrt(damage)/8.0) * scaling * 0.5);
			
			if (explodes) {
				damscale *= max(1.4, 0.31 * sqrt(explode));
			}

			double basescale = min(max(0.25 * scaling, damscale), 0.9 * size)*0.5;
			double barrelwidth = min(max(0.25 * scaling, damscale), 0.9 * sqrt(2) * size)*0.5;
			
			int maxbarrelcount = max(1, 1 + ((rof-2)/4).floor());
			
			double maxcircle = (0.9 * 0.75 * size);
			
			int barrelcount = max(1, min(((maxcircle*2)/(barrelwidth*2.2)).floor(), maxbarrelcount));

			basescale = max(basescale, min(0.9*size*0.5, barrelwidth*(barrelcount*2-1)*0.5));
			
			double barrelspacing = barrelcount > 1 ? max(min(barrelwidth*2, barrelwidth*0.25 + barrelcount*barrelwidth*0.05), (basescale*0.8*2 - (barrelcount * barrelwidth)) / (barrelcount - 1)) : 0.0; 
			
			double barrellength = max(basescale*2 * (explodes ? 0.9 : 1.0), scale * scaling * 0.5 * (vel / 1128.3) ) ;
			
			this.ctx
			    ..fillStyle = fill
				..beginPath()
				..arc(ox, oy, basescale*2, 0, 2*PI)
				..closePath()..fill()..stroke();
			
			double oby = ((barrelcount * barrelwidth * 2) + ((barrelcount-1) * barrelspacing))*0.5 - barrelwidth; 
			for (int i=0; i<barrelcount; i++) {
				double o = i * ((barrelwidth*2) + barrelspacing);
				
				this.ctx
					..beginPath()
					..moveTo(ox + r.x(-basescale, -barrelwidth - oby + o), oy + r.y(-basescale, -barrelwidth - oby + o))
					..lineTo(ox + r.x(-basescale, barrelwidth - oby + o), oy + r.y(-basescale, barrelwidth - oby + o))
					..lineTo(ox + r.x(barrellength*2-basescale, barrelwidth - oby + o), oy + r.y(barrellength*2-basescale, barrelwidth - oby + o))
					..lineTo(ox + r.x(barrellength*2-basescale, -barrelwidth - oby + o), oy + r.y(barrellength*2-basescale, -barrelwidth - oby + o))
					..closePath()..fill()..stroke();
			}
		}
		
		if (shield) {
			CanvasGradient sgrad = this.ctx.createRadialGradient(ox, oy, 0, ox, oy, size);
			sgrad.addColorStop(0, shieldcol2);
			sgrad.addColorStop(1, shieldcol);
			
			this.ctx
				..fillStyle = sgrad
				..strokeStyle = shieldlinecol
				..globalCompositeOperation = "lighter"
				..beginPath()
				..arc(ox, oy, size, 0, 2*PI)
				..closePath()..fill()..stroke()
				..globalCompositeOperation = "source-over";
		}
	}
	
	void drawBlockGroup(List<BlockWithPos> blocks, {BlockWithPos coreblock:null, int scaleoverride, bool recentre:false, double angleoffset:0.0}) {
		List<Vertex> verts = new List<Vertex>();
		int maxscale = 0;
		
		double totalx = 0.0;
		double totaly = 0.0;
		double totalmass = 0.0;
		
		double xmin = 2000000000.0;
		double xmax = -2000000000.0;
		double ymin = 2000000000.0;
		double ymax = -2000000000.0;
		
		Rotate rot = new Rotate(angleoffset);
				
		for (BlockWithPos bwp in blocks) {
			ModuleBlock block = bwp.module;
			FieldShape fshape = (block.fields["shape"] as FieldShape);
            FieldInt fscale = (block.fields["scale"] as FieldInt);
            FieldDouble fdensity = (block.fields["density"] as FieldDouble);
            int scale = fscale.active ? fscale.value : 1;
            BlockShape shape = ShapeList.SQUARE;
			if (fshape.active) {
				shape = fshape.get();
			}
			if (scale > shape.maxScale) {
				shape = ShapeList.MISSING;
			}
            double density = fdensity.active ? fdensity.value : 0.1;
            Rotate r = new Rotate(bwp.angle);
            
            double mass = max(0.01, density * shape.areas[scale-1]);
            Vertex centroid = shape.centroids[scale-1];
            
            totalmass += mass;
            totalx += (centroid.x + bwp.x) * mass;
            totaly += (centroid.y + bwp.y) * mass;
            
            maxscale = max(scale, maxscale);
            
            for (Vertex v in shape.vertices[scale-1]) {
            	double vx = v.x.toDouble();
            	double vy = v.y.toDouble();
            	
            	double vx2 = r.x(vx, vy) + bwp.x;
            	double vy2 = r.y(vx, vy) + bwp.y;
            	
            	if (angleoffset != 0.0) {
    			 	double arx = rot.x(vx2, vy2);
    				double ary = rot.y(vx2, vy2);
        			vx2 = arx;
        			vy2 = ary;
        		}
            	
            	verts.add(new Vertex(vx2, vy2));
            	
            	xmin = min(xmin, vx2);
    			xmax = max(xmax, vx2);
    			ymin = min(ymin, vy2);
    			ymax = max(ymax, vy2);
            }
		}
		
		double midx = (xmin+xmax)*0.5;
		double midy = (ymin+ymax)*0.5;
		
		double avex = totalx / totalmass;
		double avey = totaly / totalmass;
		
		if (recentre) {
			avex += midx;
			avey += midy;
		}
		
		for (Vertex v in verts) {
			v.x -= avex;
			v.y -= avey;
		}

		double scaling = 0.0;
		if (coreblock != null) {
			ModuleBlock block = coreblock.module;
			BlockShape shape = block.get("shape");
            int scale = block.get("scale");
            if (scale > shape.maxScale) {
            	shape = ShapeList.MISSING;
            }
            
            scaling = calcScaling(shape.vertices[scale-1], scale, verts);
		} else {
			scaling = calcScaling(verts, scaleoverride != null ? scaleoverride : maxscale);
		}
		
		double bx,by,arx,ary,ba;
		for (BlockWithPos bwp in blocks) {
			bx = bwp.x - avex;
			by = bwp.y - avey;
			ba = bwp.angle;
			
			if (angleoffset != 0.0) {
				arx = rot.x(bx, by);
				ary = rot.y(bx, by);
				bx = arx;
				by = ary;
				ba += angleoffset;
			}
			
			drawBlock(bwp.module, scaling:scaling, xoffset:bx, yoffset:by, angle:ba);
		}
	}
	
	List<BlockWithPos> getComponentBlocks(Component comp) {
		List<BlockWithPos> blocks = [];
		
		BlockWithPos launcher = new BlockWithPos(comp.module, 0.0,0.0,0.0);
		blocks.add(launcher);
		
		BlockShape shape = comp.module.get("shape");
        int scale = comp.module.get("scale");
        if (scale > shape.maxScale) {
        	shape = ShapeList.MISSING;
        }

        if (!shape.hardpointCounts[scale-1].containsKey(HardpointType.LAUNCHER)) { return blocks; }
        
		FieldEnum ffeatures = (comp.module.fields["features"] as FieldEnum);
		if (ffeatures.active && ffeatures.theEnum[EnumFeature.LAUNCHER]) {
			ModuleBlock spawn = comp.module.get("replicateBlock");

			if (spawn != null) {
				BlockShape spawnshape = spawn.get("shape");
                int spawnscale = spawn.get("scale");
                
                /*Map<HardpointType, List<HardpointType>> launchlist = {
                	HardpointType.LAUNCHER : [HardpointType.MISSILE, HardpointType.ROOT, HardpointType.CONNECTOR],
                	//HardpointType.LAUNCHER_LEFT : [HardpointType.MISSILE_LEFT, HardpointType.MISSILE, HardpointType.ROOT, HardpointType.CONNECTOR],
                	//HardpointType.LAUNCHER_RIGHT : [HardpointType.MISSILE_RIGHT, HardpointType.MISSILE, HardpointType.ROOT, HardpointType.CONNECTOR],
                };
                
                for (HardpointType lhp in launchlist.keys) {
	                if (shape.hardpointTypes[scale-1].contains(lhp)) {
	                	
		                List<Hardpoint> launchers = [];
		                List<Hardpoint> connectors = [];
		                
		                for (Hardpoint h in shape.hardpoints[scale-1]) {
		                	if (h.type == lhp) {
		                		launchers.add(h);
		                	}
		                }
		                
		                for (Hardpoint h in spawnshape.hardpoints[spawnscale-1]) {
		                	if (launchlist[lhp].contains(h.type)) {
		                		connectors.add(h);
		                	}
		                }
		                connectors.sort(sortHardpoints);
		                
		                int spawncount = launchers.length;
		                
		                if (connectors.length > 0) {
			                for (int i=0; i<spawncount; i++) {
			                	Hardpoint hp = launchers[i];
			                	Hardpoint con = connectors[0];
	
			                	double ang1 = atan2(hp.normal.y, hp.normal.x);
			                	Rotate r1 = new Rotate(ang1);
	
			                	double ang2 = atan2(con.normal.y, con.normal.x);
			                	Rotate r2 = new Rotate(ang1 + PI-ang2);
			                	
			                	double ox = (hp.x - r2.x(con.x, con.y));
			                	double oy = (hp.y - r2.y(con.x, con.y));
			                	
			                	blocks.add(new BlockWithPos(spawn, ox, oy, (ang1 + PI-ang2)));
			                }
		                }
	                
	                }
                }*/
                
                List<HardpointType> launchlist = [HardpointType.MISSILE, HardpointType.ROOT, HardpointType.CONNECTOR];
                
                List<Hardpoint> launchers = [];
                for (Hardpoint hp in shape.hardpoints[scale-1]) {
                	if (hp.type == HardpointType.LAUNCHER) {
                		if (shape.radial) {
                			launchers.add(hp);
                		} else {
                			double dot = hp.normal.x; // simplifies from x1*x2 + y1*y2 where x2,y2 is 1.0,0.0
                			//print("hp:${hp.x},${hp.y}, hpn:${hp.normal.x},${hp.normal.y}, dot: $dot");
                			if (dot < -0.7072) {
                				continue;
                			}
                			launchers.add(hp);
                		}
                	}
                }
                
                if (launchers.isEmpty) { return blocks; }
                
                List<Hardpoint> connectors = [];
                for (Hardpoint hp in spawnshape.hardpoints[spawnscale-1]) {
                	if (launchlist.contains(hp.type)) {
                		connectors.add(hp);
                	}
                }
                
                if (connectors.isEmpty) { return blocks; }
                
                for (Hardpoint hp in launchers) {
                	double angl = atan2(hp.normal.y, hp.normal.x);
                    //Rotate rl = new Rotate(angl);
                    Map<Hardpoint, double> dots = {};
                    List<Hardpoint> viables = [];
                    
                    double tx = shape.radial ? hp.normal.x : 1.0;
                    double ty = shape.radial ? -hp.normal.y : 0.0;
                    
                    for (Hardpoint cp in connectors) {
                    	double angc = atan2(cp.normal.y, cp.normal.x);
                    	Rotate rc = new Rotate(angl + PI - angc);
                    	
                    	double fdot = rc.x(tx, ty);
                		if (fdot < -0.001) {
                			continue;
                		}
                		
                		dots[cp] = fdot;
                		viables.add(cp);
                    }
                    
                    if (viables.isEmpty) { continue; }
                    
                    viables.sort((Hardpoint hp1, Hardpoint hp2){
                    	if (hp1.type.priority != hp2.type.priority) {
                    		return hp2.type.priority.compareTo(hp1.type.priority);
                    	}
                    	double delta = (dots[hp2] - dots[hp1]).abs();
                    	if (delta < 0.001) {
                    		return hp2.id.compareTo(hp1.id);
                    	}
                    	
                    	return dots[hp2].compareTo(dots[hp1]);
                    });

                    Hardpoint cp = viables[0];
                    
                    double angc = atan2(cp.normal.y, cp.normal.x);
                    Rotate rc = new Rotate(angl + PI - angc);
                    
                    double ox = (hp.x - rc.x(cp.x, cp.y));
                    double oy = (hp.y - rc.y(cp.x, cp.y));
                    			                	
                    blocks.add(new BlockWithPos(spawn, ox, oy, (angl + PI-angc)));
                }
			}
		}
		return blocks;
	}
	
	void drawComponent(Component comp) {
		if (comp.module == null) { return; }
		
		List<BlockWithPos> blocks = getComponentBlocks(comp);
		BlockWithPos launcher = new BlockWithPos(comp.module, 0.0,0.0,0.0);

		BlockShape shape = comp.module.get("shape");
        int scale = comp.module.get("scale");
        if (scale > shape.maxScale) {
        	shape = ShapeList.MISSING;
        }

		print("comp: ${shape.name} @ $scale");
        
        double scaling = calcScaling(shape.vertices[scale-1], scale);
		
		FieldEnum ffeatures = (comp.module.fields["features"] as FieldEnum);
		if (ffeatures.active && ffeatures.theEnum[EnumFeature.LAUNCHER]) {
			drawBlockGroup(blocks, coreblock:launcher);
		} else {
			drawBlockGroup(blocks);
		}

		if (shape == ShapeList.MISSING) {
			this.ctx
				..fillStyle="rgba(60,60,60,0.6)"
				..fillRect(0,0,this.width,this.height)
				..fillStyle="#DDDDDD"
				..font = "${(this.height/2).floor()}px Droid Sans Mono"
				..textAlign = "center"
				..fillText("?", this.width/2, (this.height/4)*2.4)
				..font = "${(this.height/9).floor()}px Droid Sans Mono"
				..fillText("Missing shape", this.width/2, (this.height/4)*3.2);
		}
	}
	
	void drawComponentGroup(List<ComponentWithPos> components, {int scaleoverride, bool recentre:true, double angleoffset:0.0}) {
		List<BlockWithPos> blocks = [];
		
		for (ComponentWithPos c in components) {
			List<BlockWithPos> shapes = getComponentBlocks(c.component);
			for (BlockWithPos p in shapes) {
				p.rotate(c.angle);
				p.offset(c.x, c.y);
				blocks.add(p);
			}
		}
		
		drawBlockGroup(blocks, scaleoverride:scaleoverride, recentre:recentre, angleoffset:angleoffset);
	}
}

class BlockWithPos {
	ModuleBlock module;
	double x;
	double y;
	double angle;
	
	BlockWithPos(ModuleBlock this.module, double this.x, double this.y, double this.angle) {}
	
	void rotate(double angle) {
		this.angle += angle;
		double s = sin(angle);
		double c = cos(angle);
		double x = c*this.x - s*this.y;
		double y = s*this.x + c*this.y;
		this.x = x;
		this.y = y;
	}
	
	void offset(double x, double y) {
		this.x += x;
		this.y += y;
	}
}

class ComponentWithPos {
	Component component;
	double x;
	double y;
	double angle;
	
	ComponentWithPos(Component this.component, double this.x, double this.y, double this.angle) {}
}