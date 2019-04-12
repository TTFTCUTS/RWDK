part of RWDK;

PartList regionList;
StarchartRenderer starchart;

class Region implements IModuleParent, IPartListable {
	ModuleRegion module;
	Element element;
	PartList partlist;
	Element idelement;
	Element infoelement;
	Element deleteelement;
	Element colourElement;
	Element factionElement;
	bool selected = false;
	int partid;
	Map rendercolour = {"r":127, "g":127, "b":127};
	
	Region([ModuleRegion this.module]) {
		if (this.module == null) {
			this.module = new ModuleRegion();
		}
		this.module.parent = this;
	}
	
	IPartListable copy() {
		Region c = new Region();
		c.module = this.module.copy();
		c.module.parent = c;
		return c;
	}
	
	void destroy() {
		this.module.destroyElement();
		this.element.remove();
		this.element = null;
		starchart.update(regionList.selected);
	}
	
	void select() {
		this.selected = true;
		Element e = this.module.createElement();
		this.module.update();
		this.partlist.details.append(e);
		this.element.className = "ui regionbox selected";
		
		starchart.update(this);
	}
	
	void deselect() {
		this.selected = false;
		this.module.destroyElement();
		this.element.className = "ui regionbox";
	}
	
	void createElement([int position = -1]) {
		DivElement div = new DivElement();
		div
			..className="ui regionbox"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
			
			this.partlist.select(this);
			
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
		});
		this.element = div;
		
		//this.element.append(this.renderer.canvas);
		
		SpanElement name = new SpanElement();
		name
			..className = "regionname";
		div.append(name);
		
		SpanElement ide = new SpanElement();
		this.idelement = ide;
		ide..text = "0"
			..className="regionid";
		name.append(ide);
		
		SpanElement inf = new SpanElement();
		this.infoelement = inf;
		inf..text = "info"
			..className="regioninfo";
		name.append(inf);
		
		SpanElement fac = new SpanElement();
		this.factionElement = fac;
		fac
			..text="Faction"
			..className="regionfaction";
		div.append(fac);
		
		
		DivElement colourdiv = new DivElement();
		colourdiv..className="regioncolour";
		div.append(colourdiv);
		this.colourElement = colourdiv;
		
		// sorting buttons
		DivElement sortleft = new DivElement();
		sortleft..className="ui regionsortbutton"
			..innerHtml = '<i class="glyphicon glyphicon-menu-up"></i>'
			..title = "Move this region up"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
			e.stopPropagation();
			
			this.partlist.shiftLeft(this);
		});
		div.append(sortleft);
		
		DivElement sortright = new DivElement();
		sortright..className="ui regionsortbutton sortdown"
			..innerHtml = '<i class="glyphicon glyphicon-menu-down"></i>'
			..title = "Move this region down"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
			e.stopPropagation();
			
			this.partlist.shiftRight(this);
		});
		div.append(sortright);
		
		// copy button
		DivElement copy = new DivElement();
		copy..className="ui regioncopybutton"
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
		delete..className="ui regiondeletebutton"
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
		deletescreen..className="regiondeletescreen"
			..innerHtml ="Delete this region? "
			..addEventListener("click", (MouseEvent e){
			e.stopPropagation();
			e.stopImmediatePropagation();
		});
		this.deleteelement = deletescreen;
		div.append(deletescreen);
		
		DivElement deleteyes = new DivElement();
		deleteyes..className="regiondeletescreenbutton deleteyes glyphicon glyphicon-ok"
		    ..title = "Delete the region"
			..addEventListener("click", (MouseEvent e){
			this.partlist.destroy(this);
		});
		deletescreen.append(deleteyes);
		
		DivElement deleteno = new DivElement();
		deleteno..className="regiondeletescreenbutton deleteno glyphicon glyphicon-remove"
		    ..title = "Keep the regtion"
			..addEventListener("click", (MouseEvent e){
			
			this.deleteelement.style.display = "none";
		});
		deletescreen.append(deleteno);
		
		this.update();
	}

	void updateFromModule() {
		int id = this.module.get("ident");
		bool hasfaction = this.module.fields["faction"].active;
		int faction = this.module.get("faction");
		int count = this.module.get("count");
		var pos = this.module.get("position");
		var size = this.module.get("radius");
		
		var fleets = this.module.get("fleets");
		
		if (!hasfaction && fleets.length > 0) {
			int dom = -1;
			double most = 0.0;
			for (var f in fleets) {
				double p = f["0"]+f["1"];
				if (p > most) {
					most = p;
					dom = f["faction"];
				}
			}
			if (dom != -1) {
				faction = dom;
				hasfaction = true;
			}
		}
		
		var colour = this.module.get("color");
		
		if (colour == null && hasfaction) {
			for (Faction f in factionList.order) {
				int id = f.module.get("ident");
				if (id == faction) {
					colour = f.averageColour();
					break;
				}
			}
		}
		
		if (colour != null) {
			this.rendercolour = colour;
			this.colourElement.style.backgroundColor="rgb(${colour["r"]},${colour["g"]},${colour["b"]})";
		} else {
			this.rendercolour = {"r":127, "g":127, "b":127};
			this.colourElement.style.backgroundColor="#808080";
		}
		
		if (hasfaction) {
			bool found = false;
			for (Faction f in factionList.order) {
				int id = f.module.get("ident");
				if (id == faction) {
					String name = f.module.get("name");
					if (!name.isEmpty) {
						this.factionElement.text = name;
						found = true;
					}
					break;
				}
			}
			if (!found) {
				this.factionElement.text = "F$faction";
			}
		} else {
			this.factionElement.text="";
		}
		
		String spos = pos["0"] == pos["1"] ? "${percent(pos["0"])}%" : "${percent(pos["0"])}-${percent(pos["1"])}%";
		String ssize = size["0"] == size["1"] ? "${percent(size["0"])}%" : "${percent(size["0"])}-${percent(size["1"])}%";
		
		String info = "x$count, $ssize @$spos";
		
		this.idelement.text="$id ";
		this.infoelement.text=info;
		
		starchart.update(regionList.selected);
	}
	
	void update() {
		this.module.update();
	}
	
	void save(StringBuffer buffer, [int indent = 0]) {
		this.module.save(buffer, indent);
	}
	
	static void create() {
    	Region f = new Region();
    	regionList.add(f);
    	f.update();
    }
}