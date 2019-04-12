part of RWDK;

PartList customShapeList;

class CustomShape extends BlockShape implements IPartListable {
	int id;
	List mirrors = [];
	bool mirrored = false;
	CustomShape mirror = null;
	
	List<List<HardpointDefinition>> hardpointdefs = new List<List<HardpointDefinition>>(10);
	
	Element element;
	Element nameelement;
	Element infoelement;
	Element deleteelement;
	bool selected = false;
	BlockRenderer renderer;
	PartList partlist;
	int partid;
	
	CustomShape(int id, [bool radial = false]) : super(id.toString(), maxScale:1) {
		this.renderer = new BlockRenderer(100,100);
		this.id = id;
		this.radial = radial;
	}
	
	void createElement(){
		DivElement div = new DivElement();
		div
			..className="ui component"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
			
			this.partlist.select(this);
			
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
		});
		this.element = div;
		
		this.element.append(this.renderer.canvas);
		
		SpanElement name = new SpanElement();
		this.nameelement = name;
		name
			..text = "Shape name"
			..className = "componentname";
		div.append(name);
		
		SpanElement info = new SpanElement();
		this.infoelement = info;
		info
			..text = "Shape info"
			..className = "componentinfo";
		div.append(info);
		
		// sorting buttons
		DivElement sortleft = new DivElement();
		sortleft..className="ui sortbutton sortleft"
			..innerHtml = '<i class="glyphicon glyphicon-menu-left"></i>'
			..title = "Move this shape left"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
			e.stopPropagation();
			
			this.partlist.shiftLeft(this);
		});
		div.append(sortleft);
		
		DivElement sortright = new DivElement();
		sortright..className="ui sortbutton sortright"
			..innerHtml = '<i class="glyphicon glyphicon-menu-right"></i>'
			..title = "Move this shape right"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
			e.stopPropagation();
			
			this.partlist.shiftRight(this);
		});
		div.append(sortright);
		
		// copy button
		DivElement copy = new DivElement();
		copy..className="ui copybutton"
			..innerHtml = '<i class="glyphicon glyphicon-duplicate"></i>'
			..title = "Duplicate this shape."
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
		
			this.partlist.copy(this);
			
			e.stopPropagation();
		});
		div.append(copy);
		
		// delete button
		DivElement delete = new DivElement();
		delete..className="ui deletebutton"
			..innerHtml = '<i class="glyphicon glyphicon-trash"></i>'
			..title = "Delete this shape"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
		
			this.deleteelement.style.display = "block";
			
			e.stopPropagation();
		});
		div.append(delete);
		
		// deletion overlay
		
		DivElement deletescreen = new DivElement();
		deletescreen..className="deletescreen"
			..innerHtml ="Delete this shape?<br/>"
			..addEventListener("click", (MouseEvent e){
			e.stopPropagation();
			e.stopImmediatePropagation();
		});
		this.deleteelement = deletescreen;
		div.append(deletescreen);
		
		DivElement deleteyes = new DivElement();
		deleteyes..className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
		    ..title = "Delete the shape"
			..addEventListener("click", (MouseEvent e){
			this.partlist.destroy(this);
		});
		deletescreen.append(deleteyes);
		
		DivElement deleteno = new DivElement();
		deleteno..className="deletescreenbutton deleteno glyphicon glyphicon-remove"
		    ..title = "Keep the shape"
			..addEventListener("click", (MouseEvent e){
			
			this.deleteelement.style.display = "none";
		});
		deletescreen.append(deleteno);
		
		this.update();
	}
    	
	void select() {
		this.selected = true;
		//Element e = this.module.createElement();
		//this.module.update();
		//this.partlist.details.append(e);
		this.element.className = "ui component selected";
	}
	
	void deselect() {
		this.selected = false;
		//this.module.destroyElement();
		this.element.className = "ui component";
	}
	
	static void create() {
    	CustomShape c = new CustomShape(0);
    	c.maxScale = 1;
    	c.hardpointdefs[0] = [];
    	c.vertices[0] = [];
    	c.computeShapeInfo();
    	
    	customShapeList.add(c);
    	//(c.module.fields["ident"] as FieldInt).value = findNextBlockID();
    	c.update();
    }
	void destroy(){
		this.element.remove();
		this.element = null;
	}
	
	IPartListable copy(){
		CustomShape c = new CustomShape(this.id);
		c.maxScale = this.maxScale;
		c.mirrored = this.mirrored;
		c.mirror = this.mirror;
		c.radial = this.radial;
		for (int i=0; i<this.maxScale; i++) {
			c.vertices[i] = [];
			for (Vertex v in this.vertices[i]) {
				c.vertices[i].add(v.copy());
			}
			c.hardpointdefs[i] = [];
			for (HardpointDefinition v in this.hardpointdefs[i]) {
				c.hardpointdefs[i].add(v.copy());
			}
		}
		c.computeShapeInfo();
		return c;
	}
	
	void update() {
		if (this.mirrored) {
			this.updateMirror();
		} else {
			this.computeShapeInfo();
			for (CustomShape s in mirrors) {
				s.updateMirror();
			}
		}
		this.updateRenderer();
	}
	
	void updateRenderer() {
		this.renderer
			..clear()
			..drawGrid(this)
			..drawBlockShape(this, bold:true);
		this.nameelement.text = this.name;
	}
	
	void computeShapeInfo() {
		this.hardpoints = [];
		
		for (int i=0; i<this.maxScale; i++) {
			List<HardpointDefinition> scale = this.hardpointdefs[i];
			List<Hardpoint> hp = [];
			
			for (HardpointDefinition def in scale) {
				if (def.sideid >= this.vertices[i].length) { continue; }
				
				Vertex v1 = this.vertices[i][def.sideid];
				int id2 = def.sideid + 1;
				if (id2 >= this.vertices[i].length) {
					id2 = 0;
				}
				Vertex v2 = this.vertices[i][id2];
				
				double dx = v2.x - v1.x;
				double dy = v2.y - v1.y;
				
				Hardpoint h = new Hardpoint(def.type, v1.x + dx * def.fraction, v1.y + dy * def.fraction, dy, -dx);
				
				hp.add(h);
			}
			this.hardpoints.add(hp);
		}
		
		super.computeShapeInfo();
	}
	
	void setMirror([CustomShape s = null]) {
		if (s != null) {
			this.mirror = s;
			this.mirrored = true;
			s.mirrors.add(this);
		} else {
			this.mirrored = false;
			if (this.mirror != null) {
				this.mirror.mirrors.remove(this);
			}
			this.mirror = null;
		}
	}
	
	void processShapeData(Map data) {
		//print(data);
		
		this.vertices = new List<List<Vertex>>(10);
		this.hardpointdefs = new List<List<HardpointDefinition>>(10);
		this.maxScale = 0;
		
		for (Map m in data.values) {
			this.maxScale++;
			//print("Scale ${this.maxScale}: $m");
			List<HardpointDefinition> defs = [];
			List<Vertex> verts = [];
			bool autoports = false;
			
			if (m.containsKey("verts") && m["verts"] is Map) {
				Map v = m["verts"];
				
				for (var vert in v.values) {
					if (vert is Map) {
						num x = num.parse(vert.values.first, (String s) {return 0.0;});
						num y = num.parse(vert.values.last, (String s) {return 0.0;});

						verts.add(new Vertex(x*0.1, y*-0.1));
					}
				}
			}
			
			if (m.containsKey("rwdk") && m["rwdk"] is Map) {
				Map meta = m["rwdk"];
			}
			
			if (autoports == false && m.containsKey("ports") && m["ports"] is Map) {
				Map p = m["ports"];
				
				for (var port in p.values) {
					if (port is Map) {
						int vert = int.parse(port["0"], onError: (String s) {return 0;});
						double fract = double.parse(port["1"], (String s) {return 0.5;});
						HardpointType hptype = HardpointType.CONNECTOR;
						
						String hpstype = "NORMAL";
						if (port.containsKey("2")) {
							hpstype = port["2"];
						}
						
						if (HardpointType.saveMap.containsKey(hpstype)) {
							hptype = HardpointType.saveMap[hpstype];
						}
						
						defs.add(new HardpointDefinition(vert, fract, hptype));
						//print("port: v:$vert, f:$fract, t:$hpstype");
					}
				}
			}
			
			this.hardpointdefs[maxScale-1] = defs;
			this.vertices[maxScale-1] = verts;
		}
	}
	
	void updateMirror() {
		if (this.mirrored) {
			this.vertices = [];
			this.hardpoints = [];
			this.maxScale = mirror.maxScale;
    		
    		//for (List<Vertex> scale in mirror.vertices) {
			for (int i=0; i<this.maxScale; i++) {
				List<Vertex> scale = mirror.vertices[i];
    			List<Vertex> verts = [];
    			for (Vertex v in scale) {
    				Vertex v2 = v.copy();
    				v2.y = -v2.y;
    				verts.add(v2);
    			}
    			this.vertices.add(verts);
    		}
    		
    		//for (List<HardpointDefinition> scale in mirror.hardpointdefs) {
    		for (int i=0; i<this.maxScale; i++) {
    			List<HardpointDefinition> scale = mirror.hardpointdefs[i];
    			List<HardpointDefinition> verts = [];
    			for (HardpointDefinition v in scale) {
    				HardpointDefinition v2 = v.copy();
    				verts.add(v2);
    			}
    			this.hardpointdefs[i] = verts;
    		}
    		
    		this.computeShapeInfo();
		}
	}
	
	static CustomShape mirrorOf(int id, CustomShape source) {
		//print("Mirroring shape ${source.id} as $id");
		
		return new CustomShape(id)..setMirror(source)..updateMirror();
	}
	
	static CustomShape load(Map json) {
		Map scaledata = null;
		int id = -1;
		bool radial = false;
		int mirror = -1;
		
		for (String k in json.keys) {
			if (k == "ident") {
				id = int.parse(json[k], onError : (String s) { return -1; }); 
			} else if (k == "launcher_radial") {
				if (json[k] == "true") {
					radial = true;
				} else {
					radial = false;
				}
			} else if (k == "mirror_of") {
				mirror = int.parse(json[k], onError : (String s) { return -1; }); 
			} else {
				if (json[k] is Map) {
					scaledata = json[k];
				}
			}
		}
		
		if (id == -1 || scaledata == null) {
			return null;
		}
		
		if (mirror != -1) {
			for (CustomShape s in customShapeList.order) {
				if (s.id == mirror) {
					return mirrorOf(id, s);
				}
			}
			//print("Shape $id failed to load: no shape with id $mirror to mirror.");
			return null;
		}
		
		//print("id:$id, radial:$radial, mirror:$mirror, data:$scaledata");
		
		return new CustomShape(id, radial)..processShapeData(scaledata)..computeShapeInfo();
	}
	
	void save(StringBuffer buffer, [int indent = 0]){
		
	}
}

class HardpointDefinition {
	int sideid;
	double fraction;
	HardpointType type;
	
	HardpointDefinition(int this.sideid, double this.fraction, [HardpointType this.type = HardpointType.CONNECTOR]);
	
	HardpointDefinition copy() {
		return new HardpointDefinition(this.sideid, this.fraction, this.type);
	}
}

/*class CustomShapeList {
	static List<CustomShape> shapes = [];
	static Map<String, CustomShape> namemap = {};
	
	static void load(Map json) {
		CustomShape s = CustomShape.load(json);
		
		if (s != null) {
			shapes.add(s);
			namemap[s.name] = s;
		}
	}
	
	static void clear() {
		shapes.clear();
	}
	
	static void remove(CustomShape shape) {
		shapes.remove(shape);
	}
}*/