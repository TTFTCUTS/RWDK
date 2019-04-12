part of RWDK;

class CollapsingBox {
	Element element;
	Element cell;
	Element button;
	bool expanded = false;
	
	CollapsingBox(int index, Element content) {
		TableElement table;
    	
    	table = new TableElement();
    	table.id = "moduletable_$index";
    	table.className = "inlineblock";
    	TableRowElement row = new TableRowElement();
    	table.append(row);
    	
    	TableCellElement c1 = new TableCellElement();
    	row.append(c1);
    	
    	DivElement button = new DivElement();
    	button
    		..className = "button glyphicon glyphicon-plus"
    		..title="Expand group"
    		//..text = "+"
    		..id = "expand_$index"
    		..addEventListener("click", (MouseEvent e) {
    			if (e.button != 0) {return;}
    			Element button = (e.target as Element);
    			String t_index = button.id.substring(7);
    			TableElement table = querySelector("#moduletable_$t_index");
    			TableCellElement t = querySelector("#module_$t_index");
    			if (t == null) {
    				print("element not found");
    				return;
    			}

    			this.toggle();
    			e.stopImmediatePropagation();
    		});
    	c1.append(button);
    	this.button = button;
    	
    	TableCellElement c2 = new TableCellElement();
        row.append(c2);
    	c2.id = "module_$index";
    	c2.className = "nodisplay";
        c2.append(content);
        this.cell = c2;
        
        this.element = table;
	}
	
	void expand() {
		if (!this.expanded) {
			this.expanded = true;
			this.element.style.display = "block";
			this.cell.style.display = "block";
			this.button.className = "button glyphicon glyphicon-minus";
			this.button.title="Collapse group";
		}
	}
	
	void collapse() {
		if (this.expanded) {
			this.expanded = false;
			this.element.style.display = "inline-block";
			this.cell.style.display = "none";
			this.button.className = "button glyphicon glyphicon-plus";
            this.button.title="Expand group";
		}
	}
	
	void toggle() {
		if (this.expanded) {
			this.collapse();
		} else {
			this.expand();
		}
	}
}

bool enumValModule(Module m, String fieldname, RichEnum val) {
	FieldEnum field = (m.fields[fieldname] as FieldEnum);
	return field.active && field.shouldShow() && field.theEnum[val];
}

bool enumVal(Field f, String fieldname, RichEnum val) {
	return enumValModule(f.parent, fieldname, val);
}



bool enumValsModule(Module m, String fieldname, List<RichEnum> vals, [bool and = false]) {
	FieldEnum field = (m.fields[fieldname] as FieldEnum);
	
	if (field.active && field.shouldShow()) {
		for (RichEnum val in vals) {
			if (field.theEnum[val]) {
				if (!and) {
					return true;
				}
			} else {
				if (and) {
					return false;
				}
			}
		}
	}
	return and;
}

bool enumVals(Field f, String fieldname, List<RichEnum> vals, [bool and = false]) {
	return enumValsModule(f.parent, fieldname, vals, and);
}

bool fieldIsSubModule(Field f) {
	return f.parent.parentField != null;
}

bool isNumeric(String s) {
	if(s == null) {
		return false;
	}
	
	return double.parse(s, (e) => null) != null || 
	int.parse(s, onError: (e) => null) != null;
}

void alertbox(String title, dynamic message) {
	querySelector("#alerttitle").text = "$title";
	querySelector("#alerttext").text = "$message";
	querySelector("#alertbox").style.display="block";
	querySelector("#alertbackground").style.display="block";
}

var confirmboxaction = null;
void confirmbox(String title, String message, String yes, String no, void action()) {
	querySelector("#confirmtitle").text = "$title";
    querySelector("#confirmtext").text = "$message";
    querySelector("#confirmbox").style.display="block";
    querySelector("#alertbackground").style.display="block";
    Element button = querySelector("#confirmbuttonyes");
    button.text=yes;
    
    confirmboxaction = (MouseEvent e) {
    	action();
    	
    	querySelector("#confirmbox")..style.display="none";
		querySelector("#alertbackground")..style.display="none";
		querySelector("#confirmtext").text = "";
		querySelector("#confirmtitle").text = "";
    	
    	if (confirmboxaction != null) {
    		button.removeEventListener("click", confirmboxaction);
    	}
    };
    	    
    button.addEventListener("click", confirmboxaction);
    
    Element button2 = querySelector("#confirmbuttonno");
    button2.text=no;
}

class ShapeDisplay {
	BlockShape shape;
	BlockRenderer renderer;
	Element element;
	int scale = 1;
	FieldShape parentField = null;
	
	bool selected = false;
	
	Element overlay;
	Element infoelement;
	
	HardpointType highlight = null;
	
	ShapeDisplay(BlockShape this.shape, {int this.scale : 1, bool sel : false, int size:150}) {
		this.element = new DivElement()
			..className = "ui shapedisplay"
			..style.width = "${size}px"
			..style.height = "${size}px"
			..addEventListener("click", (Event e) => click(this));
		this.renderer = new BlockRenderer(size,size);
		this.element.append(this.renderer.canvas);
		
		this.overlay = new DivElement()..className = "shapeoverlay"..innerHtml = "<span>Scale too high!<br/>Max scale: ${this.shape.maxScale}</span>";
		this.element.append(this.overlay);
		
		this.element.append(new SpanElement()..className="shapename"..text = shape is CustomShape ? "Custom: ${shape.name}" : shape.name);
		
		SpanElement info = new SpanElement();
		this.infoelement = info;
		info
			..text = "Shape info"
			..className = "componentinfo";
		this.element.append(info);
		
		this.selected = sel;
		
		this.update();
	}

	static void click(ShapeDisplay disp) {
		if (disp.parentField != null) {
			disp.parentField.selectShape(disp);
		}
	}
	
	static void hardpointClick(ShapeDisplay disp, HardpointType hptype) {
		if (disp.highlight != hptype) {
			disp.highlight = hptype;
			disp.update();
		}
	}
	
	void update() {
		if (this.selected) {
			this.element.className = "ui shapedisplay selected";
		} else {
			this.element.className = "ui shapedisplay";
		}
		
		this.renderer.clear();
		int drawscale = min(this.shape.maxScale, this.scale);
		this.renderer.drawGrid(this.shape, drawscale);
		this.renderer.drawBlockShape(this.shape, scale: drawscale, colour1: "#606060", colour2: "#202020", linecolour: "#BBBBBB", bold: true, highlight: this.highlight, recentre:true);

		if (this.scale > this.shape.maxScale) {
			this.overlay.style.display = "block";
		} else {
			this.overlay.style.display = "none";
		}
		
		String blurb = "";//"${this.shape.name}";
		Map<HardpointType, int> hpc = this.shape.hardpointCounts[drawscale-1];
		//bool first = true;

		String info = "<span title='Area, used when calculating mass and health' class='glyphicon glyphicon-fullscreen'>${
			this.shape.areas[drawscale-1].toStringAsFixed(2)
		}</span> <span title='Allowed block scales' class='glyphicon glyphicon-stats'>1${this.shape.maxScale == 1 ? "" : "-${this.shape.maxScale}"}</span><br/>";
		
		this.infoelement.innerHtml = info;
		
		for (HardpointType p in hpc.keys) {
			//blurb += "${first ? "" : ","} ${hpc[p]} ${hardpointNames[p]}";
			//first = false;
			
			this.infoelement.append(new SpanElement()
				..className = "glyphicon glyphicon-${p.icon}"
				//..className = "glyphicon glyphicon-${hardpointIcons[p]}"
				..style.color = p.colourBold
				//..style.color = hardpointColoursBold[p]
				..text = "${hpc[p]}"
				..title = "${p.name} hardpoints"
				//..title = "${hardpointNames[p]} hardpoints"
				..addEventListener("mouseenter", (Event e) => hardpointClick(this, p))
				..addEventListener("mouseleave", (Event e) => hardpointClick(this, null))
			);
			this.infoelement.append(new BRElement());
		}
				
		this.element.title = blurb;
		
	}
}

class Rotate {
	double nsin;
	double ncos;
	
	Rotate(double angle) {
		nsin = sin(angle);
		ncos = cos(angle);
	}
	
	double x(num x, num y) {
		return x*ncos - y*nsin;
	}
	
	double y(num x, num y) {
		return x*nsin + y*ncos;
	}
}

void saveWrite(StringBuffer buffer, Object o, [int indent=0, bool newline=true]) {
	for (int i=0; i<indent; i++) {
		buffer.write("\t");
	}
	buffer.write(o);
	if (newline) {
		buffer.write("\r\n");
	}
}

RegExp linesplit = new RegExp('\r\n|\r|\n');
int stringRows(String str, int rowlength) {
	int rows = 0;
	List<String> broken = str.split(linesplit);
	for (String s in broken) {
		rows += max(1,(s.length / rowlength.toDouble()).ceil()); 
	}
	return rows;
}

String degreeReadout(FieldDouble f) {
	return "${((f.value/(2*PI))*360).toStringAsFixed(1)}°";
}

void idreorder() {
	int start = int.parse((querySelector("#idreorderfield") as InputElement).value);
	int id = start;
	
	Map<int, int> remapping = new Map<int, int>();
	
	for (Component c in componentList.order) {
		id = reorderModule(c.module, id, remapping);
	}
	
	for (Component c in componentList.order) {
		remapModuleReplicators(c.module, remapping);
	}
	
	for (Component c in componentList.order) {
		c.update();
	}
	
	for (Ship s in Ship.shipList) {
		s.reorder(remapping);
	}
}

int incrementReorderingID(int id) {
	id++;
	if (id == 200) {
		id += 16800;
	}
	return id;
}

int reorderModule(ModuleBlock m, int id, Map<int,int> remapping) {
	FieldIdent ident = m.fields["ident"];
	if(ident.active) {
		remapping[ident.value] = id; 
		
		ident.value = id;
		
		id = incrementReorderingID(id);
	}
	
	FieldBlock rep = m.fields["replicateBlock"];
	if (rep.active && rep.mode == 1 && rep.module != null) {
		id = reorderModule(rep.module, id, remapping);
	}
	
	return id;
}

void remapModuleReplicators(ModuleBlock m, Map<int, int> remapping) {
	FieldBlock rep = m.fields["replicateBlock"];
	if (rep.active) {
		if (rep.mode == 1 && rep.module != null) {
			remapModuleReplicators(rep.module, remapping);
		} else if(rep.mode == 0) {
			if (remapping.containsKey(rep.blockID)) {
				rep.blockID = remapping[rep.blockID];
				if (rep.idInput != null) {
					rep.idInput.value = "${rep.blockID}";
				}
			}
		}
	}
}

void addLeftClick(Element element, void action(MouseEvent e)) {
	element.addEventListener("click", (MouseEvent e) {
		if (e.button != 0) { return; }
		
		action(e);
		
		e.preventDefault();
		e.stopPropagation();
	});
}

String percent(double n) {
	double p = (n*1000.0).round()/10.0;
	
	if (p % 1.0 == 0) {
		return p.toStringAsFixed(0);
	}
	
	return p.toString();
}