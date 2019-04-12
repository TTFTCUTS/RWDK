part of RWDK;

class StarchartRenderer {
	int size;
	CanvasElement canvas;
	CanvasRenderingContext2D ctx;
	
	StarchartRenderer(int this.size) {
		this.canvas = new CanvasElement()..className="starchart"..height=this.size..width=this.size;
		this.ctx = this.canvas.getContext("2d");
	}
	
	void clearToGrid() {
		this.clear();
		this.grid(5, 16);
	}
	
	void clear() {
		this.ctx.clearRect(0, 0, size, size);
	}
	
	void grid(int rings, int spokes) {
		double radius = size * 0.5 * 0.95;
		double ringstep = radius/rings;
		double mid = size*0.5;
		
		ctx.strokeStyle="#303030";
		
		for (int i=0; i<rings; i++) {
			ctx.beginPath();
			ctx.arc(size*0.5, size*0.5, (i+1)*ringstep, 0, PI*2);
			ctx.stroke();
		}
		
		ctx.beginPath();
		double ang = PI*2 / spokes;
		for (int i=0; i<spokes; i++) {
			ctx.moveTo(mid, mid);
			double x = sin(ang*i);
			double y = cos(ang*i);
			ctx.lineTo(mid + x*radius, mid + y*radius);
		}
		ctx.stroke();
	}
	
	void update([Region highlight]) {
		this.clearToGrid();
		this.drawRegions(highlight);
	}
	
	void drawRegions([Region highlight]) {
		int count = regionList.order.length;
		double increment = 2*PI / count;
		double offset = PI*0.2;
		double crad = this.size*0.95*0.5;
		double elen = crad*0.025; // length of distance variance bars
		String selected = "#FFFF00";
		this.ctx.textAlign = "center";
		
		List<dynamic> text = [];
		
		if(highlight != null) {
			var rawpos = highlight.module.get("position");
			double dist = crad * (rawpos == null ? 0.1 : rawpos["0"]);
            double dist2 = crad * (rawpos == null ? 1.0 : rawpos["1"]);
            this.ctx.strokeStyle="rgba(255,255,0,0.25)";
            this.ctx.fillStyle="rgba(255,255,0,0.025)";
            this.ctx..beginPath()..arc(this.size*0.5, this.size*0.5, dist, 0, 2*PI)..arc(this.size*0.5, this.size*0.5, dist2, 0, 2*PI, true)..closePath()..fill();
            this.ctx..beginPath()..arc(this.size*0.5, this.size*0.5, dist, 0, 2*PI)..closePath()..stroke();
            this.ctx..beginPath()..arc(this.size*0.5, this.size*0.5, dist2, 0, 2*PI)..closePath()..stroke();
		}
		
		for (int i=0; i<count; i++) {
			Region r = regionList.order[i];
			
			int id = r.module.get("ident");
			var rawrad = r.module.get("radius");
			var rawpos = r.module.get("position");
								
			double angle = offset + increment * i;
			double dist = crad * (rawpos == null ? 0.1 : rawpos["0"]);
			double dist2 = crad * (rawpos == null ? 1.0 : rawpos["1"]);
			double rad = crad * (rawpos == null ? 0.1 : rawrad["0"]);
			double rad2 = crad * (rawpos == null ? 0.15 : rawrad["1"]);
			
			double dx = sin(angle);
			double dy = cos(angle);
			
			double x0 = dx * dist;
			double y0 = dy * dist;
			double x1 = dx * dist2;
			double y1 = dy * dist2;
			
			double x = this.size*0.5 + (x0+x1)*0.5;
			double y = this.size*0.5 + (y0+y1)*0.5;
			
			var colour = r.rendercolour;
			var fill;
			var line;
			var finalline;
			if (colour != null) {
				fill = "rgba(${colour["r"]},${colour["g"]},${colour["b"]},0.1)";
				line = "rgba(${colour["r"]},${colour["g"]},${colour["b"]},0.75)";
				finalline = "rgb(${colour["r"]},${colour["g"]},${colour["b"]})";
			} else {
				fill="rgba(127,127,127,0.1)";
				line="rgba(127,127,127,0.75)";
				finalline = "rgb(127,127,127)";
			}
			
			this.ctx.fillStyle=fill;
			
			this.ctx.strokeStyle=line;
            this.ctx..beginPath()..arc(x, y, rad, 0, 2*PI)..closePath()..fill()..stroke();
			
			if (highlight == r) {
				this.ctx.strokeStyle=selected;
			} else {
				this.ctx.strokeStyle=line;
			}
			this.ctx..beginPath()..arc(x, y, rad2, 0, 2*PI)..closePath()..fill()..stroke();
			this.ctx..beginPath()..moveTo(this.size*0.5 + x0 - dy*elen, this.size*0.5 + y0 + dx*elen)..lineTo(this.size*0.5 + x0 + dy*elen, this.size*0.5 + y0 - dx*elen);
			this.ctx..moveTo(this.size*0.5 + x1 - dy*elen, this.size*0.5 + y1 + dx*elen)..lineTo(this.size*0.5 + x1 + dy*elen, this.size*0.5 + y1 - dx*elen);
			this.ctx..moveTo(this.size*0.5 + x0, this.size*0.5 + y0)..lineTo(this.size*0.5 + x1, this.size*0.5 + y1)..stroke();
			
			if (id != 0) {
				var m = {"id":id, "x":x, "y":y, "fill":(r == highlight ? "#FFFF00" : "#CCCCCC")};
				text.add(m);
			}
		}
		

		
		for (var t in text) {
			double x = t["x"];
			double y = t["y"];
			int id = t["id"];
			String fill = t["fill"];
			
			double ty = (y + 3).floor()+0.5;
			this.ctx.fillStyle = "#000000";
			this.ctx.fillText("$id", x-1, ty-1);
			this.ctx.fillText("$id", x+1, ty-1);
			this.ctx.fillText("$id", x-1, ty);
			this.ctx.fillText("$id", x+1, ty);
			this.ctx.fillText("$id", x-1, ty+1);
			this.ctx.fillText("$id", x+1, ty+1);
			
			this.ctx.fillStyle = fill;
			this.ctx.fillText("$id", x, ty);
		}
	}
}