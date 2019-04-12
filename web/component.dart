part of RWDK;

PartList componentList;

class Component implements IModuleParent, IPartListable {
	ModuleBlock module;
	Element element;
	PartList partlist;
	Element nameelement;
	Element infoelement;
	Element deleteelement;
	bool selected = false;
	int partid;
	BlockRenderer renderer;
	
	Component([ModuleBlock this.module]) {
		this.renderer = new BlockRenderer(100,100);
		if (this.module == null) {
			this.module = new ModuleBlock();
		}
		this.module.parent = this;
	}
	
	IPartListable copy() {
		Component c = new Component();
		c.module = this.module.copy();
		c.module.parent = c;
		(c.module.fields["ident"] as FieldIdent).value = findNextBlockID();
		return c;
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
	
	void createElement() {
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
			..text = "Block name"
			..className = "componentname";
		div.append(name);
		
		SpanElement info = new SpanElement();
		this.infoelement = info;
		info
			..text = "Block info"
			..className = "componentinfo";
		div.append(info);
		
		// sorting buttons
		DivElement sortleft = new DivElement();
		sortleft..className="ui sortbutton sortleft"
			..innerHtml = '<i class="glyphicon glyphicon-menu-left"></i>'
			..title = "Move this block left"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
			e.stopPropagation();
			
			this.partlist.shiftLeft(this);
		});
		div.append(sortleft);
		
		DivElement sortright = new DivElement();
		sortright..className="ui sortbutton sortright"
			..innerHtml = '<i class="glyphicon glyphicon-menu-right"></i>'
			..title = "Move this block right"
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
			..title = "Duplicate this block."
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
			..title = "Delete this block"
			..addEventListener("click", (MouseEvent e) {
			if (e.button != 0) { return; }
		
			this.deleteelement.style.display = "block";
			
			e.stopPropagation();
		});
		div.append(delete);
		
		// deletion overlay
		
		DivElement deletescreen = new DivElement();
		deletescreen..className="deletescreen"
			..innerHtml ="Delete this block?<br/>"
			..addEventListener("click", (MouseEvent e){
			e.stopPropagation();
			e.stopImmediatePropagation();
		});
		this.deleteelement = deletescreen;
		div.append(deletescreen);
		
		DivElement deleteyes = new DivElement();
		deleteyes..className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
		    ..title = "Delete the block"
			..addEventListener("click", (MouseEvent e){
			this.partlist.destroy(this);
		});
		deletescreen.append(deleteyes);
		
		DivElement deleteno = new DivElement();
		deleteno..className="deletescreenbutton deleteno glyphicon glyphicon-remove"
		    ..title = "Keep the block"
			..addEventListener("click", (MouseEvent e){
			
			this.deleteelement.style.display = "none";
		});
		deletescreen.append(deleteno);
		
		this.update();
	}
	
	void destroy() {
		this.module.destroyElement();
		this.element.remove();
		this.element = null;
	}
	
	void updateFromModule([redraw=true]) {
		FieldString name = (this.module.fields["name"] as FieldString);

		String pstring = "${this.module.hasCalculatedP ? this.module.calculatedP : "?"}P";

		this.nameelement.innerHtml = (name.active ? name.value.replaceAll("\\n", "<br/>") : "");
		
		String info = "<span title='Faction # Block ID'>${
			(this.module.fields["group"] as FieldInt).value
		}#${
			(this.module.fields["ident"] as FieldInt).value
		}</span> <span title='Block Scale' class='blockscale glyphicon glyphicon-stop'>${
			(this.module.fields["scale"] as FieldInt).value
		}</span>";
		
		FieldEnum feat = (this.module.fields["features"] as FieldEnum);
		bool icons = false;
		if (feat.active) {
			for (RichEnum e in feat.theEnum.keys) {
				if (feat.theEnum[e]) {
					if (e.iconstyle == null) {
						continue;
					}
					if (!icons) {
						info += "<br/>";
						icons = true;
					}
					info +=	"<span class='glyphicon glyphicon-${e.iconstyle}' title='${e.iconblurb}'></span>";
				}
			}
		}
		
		bool hasblock = false;
		for (Ship ship in Ship.shipList) {
			int id = this.module.get("ident");
			if (ship.blockids.contains(id)) {
				hasblock = true;
				break;
			}
		}
		if (Ship.shipList.length > 0 && !hasblock) {
			info += "<br/><span class='glyphicon glyphicon-question-sign' title='This block is not used in any loaded ship design'></span>";
		}
		
		this.infoelement.innerHtml = info;
		
		FieldString blurb = (this.module.fields["blurb"] as FieldString);
		this.element.title = blurb.active ? blurb.value : "";
		
		if (redraw) {
			this.renderer..clear()..drawComponent(this);
		}
	}
	
	void update() {
		this.module.update();
	}
	
	void save(StringBuffer buffer, [int indent = 0]) {
		this.module.save(buffer, indent);
	}
	
	static void create() {
    	Component c = new Component();
    	componentList.add(c);
    	(c.module.fields["ident"] as FieldInt).value = findNextBlockID();
    	c.update();
    }

    static int findNextBlockID() {
    	Set<int> used = new Set<int>();
    	
    	for(Component c in componentList.order) {
    		int id = c.module.get("ident");
    		used.add(id);
    	}
    	
    	int n = 1;
    	while(true) {
    		if (used.contains(n)) {
    			n++;
    		} else {
    			break;
    		}
    	}
    	
    	return n;
    }
}