part of RWDK;

PartList factionList;

class Faction implements IModuleParent, IPartListable {
	ModuleFaction module;
	Element element;
	PartList partlist;
	Element nameelement;
	Element infoelement;
	Element deleteelement;
	bool selected = false;
	int partid;
	BlockRenderer renderer;
	
	static BlockWithPos previewBlock0;
	static BlockWithPos previewBlock1;
	static BlockWithPos previewBlock2;
	
	Faction([ModuleFaction this.module]) {
		this.renderer = new BlockRenderer(100,100)..showHardpoints = false;
		if (this.module == null) {
			this.module = new ModuleFaction();
		}
		this.module.parent = this;
	}
	
	IPartListable copy() {
		Faction c = new Faction();
		c.module = this.module.copy();
		c.module.parent = c;
		return c;
	}
	
	void destroy() {
		this.module.destroyElement();
		this.element.remove();
		this.element = null;
	}
	
	void select() {
		this.selected = true;
		Element e = this.module.createElement();
		this.module.update();
		this.partlist.details.append(e);
		this.element.className = "ui component selected";
	}
	
	void deselect() {
		this.selected = false;
		this.module.destroyElement();
		this.element.className = "ui component";
	}
	
	void createElement([int position = -1]) {
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
			..text = "Faction name"
			..className = "componentname";
		div.append(name);
		
		SpanElement info = new SpanElement();
		this.infoelement = info;
		info
			..text = "Faction info"
			..className = "componentinfo";
		div.append(info);
		
		// sorting buttons
		DivElement sortleft = new DivElement();
		sortleft..className="ui sortbutton sortleft"
			..innerHtml = '<i class="glyphicon glyphicon-menu-left"></i>'
			..title = "Move this faction left"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
			e.stopPropagation();
			
			this.partlist.shiftLeft(this);
		});
		div.append(sortleft);
		
		DivElement sortright = new DivElement();
		sortright..className="ui sortbutton sortright"
			..innerHtml = '<i class="glyphicon glyphicon-menu-right"></i>'
			..title = "Move this faction right"
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
			..title = "Duplicate this faction."
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
			..title = "Delete this faction"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
		
			this.deleteelement.style.display = "block";
			
			e.stopPropagation();
		});
		div.append(delete);
		
		// deletion overlay
		
		DivElement deletescreen = new DivElement();
		deletescreen..className="deletescreen"
			..innerHtml ="Delete this faction?<br/>"
			..addEventListener("click", (MouseEvent e){
			e.stopPropagation();
			e.stopImmediatePropagation();
		});
		this.deleteelement = deletescreen;
		div.append(deletescreen);
		
		DivElement deleteyes = new DivElement();
		deleteyes..className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
		    ..title = "Delete the faction"
			..addEventListener("click", (MouseEvent e){
			this.partlist.destroy(this);
		});
		deletescreen.append(deleteyes);
		
		DivElement deleteno = new DivElement();
		deleteno..className="deletescreenbutton deleteno glyphicon glyphicon-remove"
		    ..title = "Keep the faction"
			..addEventListener("click", (MouseEvent e){
			
			this.deleteelement.style.display = "none";
		});
		deletescreen.append(deleteno);
		
		this.update();
	}

	void updateFromModule() {
		FieldString name = (this.module.fields["name"] as FieldString);
		this.nameelement.innerHtml = name.active ? name.value.replaceAll("\\n", "<br/>") : "";
		
		String info = "<span title='Faction ID'>#${
			(this.module.fields["ident"] as FieldInt).value
		}</span><br/>";
		
		FieldEnum feat = (this.module.fields["aiflags"] as FieldEnum);
		if (feat.active) {
			for (RichEnum e in feat.theEnum.keys) {
				if (feat.theEnum[e]) {
					if (e.iconstyle == null) {
						continue;
					}
					info +=	"<span class='glyphicon glyphicon-${e.iconstyle}' title='${e.iconblurb}'></span>";
				}
			}
		}
		
		this.infoelement.innerHtml = info;
		
		this.renderer..clear();
		List<BlockWithPos> preview = [];
		
		int cdiv = 3;
		
		int primaries = this.module.fields["primaries"].get();
		
		FieldColour p0 = previewBlock0.module.fields["fillColor"];
		FieldColour l0 = previewBlock0.module.fields["lineColor"];
		p0..red=0..green=0..blue=0;
		l0..red=40..green=40..blue=40;
		
		FieldColour p1 = previewBlock1.module.fields["fillColor"];
		FieldColour l1 = previewBlock1.module.fields["lineColor"];
		p1..red=0..green=0..blue=0;
		l1..red=40..green=40..blue=40;
		
		FieldColour p2 = previewBlock2.module.fields["fillColor"];
		FieldColour l2 = previewBlock2.module.fields["lineColor"];
		p2..red=0..green=0..blue=0;
		l2..red=40..green=40..blue=40;
		
		if (primaries >0) {preview.add(previewBlock0);}
		if (primaries >1) {preview.add(previewBlock1);}
		if (primaries >2) {preview.add(previewBlock2);}
		
		var c0 = this.module.fields["color0"].get();
		if (c0 != null && this.module.fields["color0"].shouldShow()) {
			FieldColour f0 = this.module.fields["color0"];
    		p0..red=f0.red..green=f0.green..blue=f0.blue;
    		l0..red=f0.red~/cdiv..green=f0.green~/cdiv..blue=f0.blue~/cdiv;
		}
		
		var c1 = this.module.fields["color1"].get();
		if (primaries > 1 && c1 != null && this.module.fields["color1"].shouldShow()) {
			FieldColour f1 = this.module.fields["color1"];
    		p1..red=f1.red..green=f1.green..blue=f1.blue;
    		l1..red=f1.red~/cdiv..green=f1.green~/cdiv..blue=f1.blue~/cdiv;
		}
		
		var c2 = this.module.fields["color2"].get();
		if (primaries > 2 && c2 != null && this.module.fields["color2"].shouldShow()) {
			FieldColour f2 = this.module.fields["color2"];
    		p2..red=f2.red..green=f2.green..blue=f2.blue;
    		l2..red=f2.red~/cdiv..green=f2.green~/cdiv..blue=f2.blue~/cdiv;
		}
		
		this.renderer.drawBlockGroup(preview);
		
		regionList.updateList();
		Ship.updateAll();
	}
	
	void update() {
		this.module.update();
	}
	
	void save(StringBuffer buffer, [int indent = 0]) {
		this.module.save(buffer, indent);
	}
	
	static void create() {
    	Faction f = new Faction();
    	factionList.add(f);
    	f.update();
    }
	
	static void initPreviews() {
		int scale = 10;
		
		Module pm0 = new ModuleBlock();
		pm0.fields["scale"].check();
		(pm0.fields["scale"] as FieldInt).value = scale;
		pm0.fields["fillColor"].check();
		pm0.fields["lineColor"].check();
        previewBlock0 = new BlockWithPos(pm0, 0.0,0.0, 0.0);
        
        Module pm1 = new ModuleBlock();
		pm1.fields["scale"].check();
		(pm1.fields["scale"] as FieldInt).value = scale;
		pm1.fields["fillColor"].check();
		pm1.fields["lineColor"].check();
        previewBlock1 = new BlockWithPos(pm1, scale.toDouble(),0.0, 0.0);
        
        Module pm2 = new ModuleBlock();
		pm2.fields["scale"].check();
		(pm2.fields["scale"] as FieldInt).value = scale;
		pm2.fields["fillColor"].check();
		pm2.fields["lineColor"].check();
        previewBlock2 = new BlockWithPos(pm2, scale.toDouble() * 2,0.0, 0.0);
	}
	
	Map averageColour() {
		int totalr = 0;
		int totalg = 0;
		int totalb = 0;
		int cols = 0;
		
		FieldColour f0 = this.module.fields["color0"];
		FieldColour f1 = this.module.fields["color1"];
		FieldColour f2 = this.module.fields["color2"];
		
		if (f0.shouldShow() && f0.active) {
			cols++;
			var c = f0.get();
			totalr += c["r"];
			totalg += c["g"];
			totalb += c["b"];
		}
		
		if (f1.shouldShow() && f1.active) {
			cols++;
			var c = f1.get();
			totalr += c["r"];
			totalg += c["g"];
			totalb += c["b"];
		}
		
		if (f2.shouldShow() && f2.active) {
			cols++;
			var c = f2.get();
			totalr += c["r"];
			totalg += c["g"];
			totalb += c["b"];
		}
		
		if (cols > 0) {
			return {"r":(totalr~/cols),"g":(totalg~/cols),"b":(totalb~/cols)};
		}
		return {"r":127,"g":127,"b":127};
	}
}