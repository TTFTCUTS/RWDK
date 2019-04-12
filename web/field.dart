part of RWDK;

int fieldID = 0;
Map<int, Field> fieldsByID = new Map<int, Field>();

abstract class Field {
	Element element;
	Element innerElement;
	CheckboxInputElement checkbox;
	String name;
	String blurb;
	Module parent;
	Function showfilter;
	bool active = false;
	bool fixed = false;
	bool updatestate = false;
	int fieldid = fieldID++;
	
	Field(String this.name, String this.blurb) {
		fieldsByID[fieldid] = this;
	}
	
	Element createInnerElement() {
		this.innerElement = new DivElement();
		
		this.innerElement
			//..className = "ui"
			..innerHtml = "<div class='field' >${this.name}</span>"
			..title = this.blurb;
		
		return this.innerElement;
	}
	
	Element createElement() {
		this.element = new TableRowElement();
		
		TableCellElement c1 = new TableCellElement();
		
		CheckboxInputElement check = new CheckboxInputElement();
		check.checked = this.active;
		check.setAttribute("fieldid", "$fieldid");
		
		if (this.fixed) {
			this.active = true;
			check.checked = true;
			check.disabled = true;
			check.title = "Required field";
		}
		
		check.addEventListener("change", (Event e) {
			CheckboxInputElement c = (e.target as CheckboxInputElement);
			int id = int.parse(c.getAttribute("fieldid"));
			Field f = fieldsByID[id];
			f.active = c.checked;
			f.update();
		});
		this.checkbox = check;
		
		c1.append(check);
		
		TableCellElement c2 = new TableCellElement();
		
		Element inner = this.createInnerElement();
		c2.append(inner);
		
		this.element
			..append(c1)
			..append(c2);
		
		return this.element;
	}
	
	void destroyElement() {
		if (this.element == null) { return; }
		this.element.remove();
		this.element = null;
	}
	
	bool shouldShow() {
		if (this.showfilter == null) {
			return true;
		}
		return this.showfilter(this);
	}
	
	void updateInternal(bool ticktock) {
		if (this.updatestate != ticktock) { return; }
		
		this.updatestate = !this.updatestate;
		this.updateSpecific(ticktock);
		
		if (this.element != null) {
			if(this.shouldShow()) {
				this.element.style.display = "";
			} else {
				this.element.style.display = "none";
			}
			
			if (this.active) {
				this.element.className = "";
			} else {
				this.element.className = "inactive";
			}
		}
		
		if (this.parent != null) {
			this.parent.updateInternal(ticktock);
		}
	}
	
	void updateSpecific(bool ticktock) {
		
	}
	
	void update() {
		this.updateInternal(this.updatestate);
	}
	
	void destroy() {
		fieldsByID[this.fieldid] = null;
	}
	
	void load(dynamic data) {}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		saveWrite(buffer, "${showFieldName?"${this.name}=":""}=VALUE,", indent);
		return true;
	}
	
	Field copy() { return null; }
	
	Object get() {
		return null;
	}

	void check() {
		if (this.checkbox != null) {
			this.checkbox.checked = true;
		}
		this.active = true;
	}
	
	void uncheck() {
		this.checkbox.checked = false;
		this.active = false;
	}
	
	void setFixed([bool mode = true]) {
		if (mode) {
			this.active = true;
		}
		this.fixed = mode;
	}
}

class FieldModule extends Field {
	Module module;
	CollapsingBox box;
	
	FieldModule(String name, String blurb, Module this.module):super(name, blurb) {
		if (this.module != null) {
			this.module.parentField = this;
		}
	}
	
	Element createInnerElement() {
		Element e = super.createInnerElement();
	
		if (this.module != null) {
			this.box = new CollapsingBox(this.fieldid, module.createElement());
			e.append(box.element);
			if (this.active) {
				box.expand();
			}
		}
		
		return e;
	}
	
	void destroyElement() {
		if (module != null) {
			module.destroyElement();
		}
		
		super.destroyElement();
	}
	
	void updateSpecific(bool ticktock) {
		if (this.module != null) {
			this.module.updateInternal(ticktock);
		}
	}
	
	void destroy() {
		if (this.module != null) {
			this.module.destroy();
		}
		super.destroy();
	}
	
	void load(dynamic data) {
		if (data is Map && this.module != null) {
			this.module.load(data);
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		if (this.module != null) {
			saveWrite(buffer, showFieldName?"${this.name}=":"", indent, false);
			this.module.save(buffer, indent, false);
			return true;
		}
		return false;
	}
	
	Field copy() { 
		FieldModule f = new FieldModule(this.name, this.blurb, this.module.copy());
		return f;
	}
	
	Object get() {
		if (this.active && this.module != null) {
			return this.module;
		}
		return null;
	}
}

class FieldBlock extends FieldModule {
	bool subBlock = false;
	Element readout;
	int blockID = 0;
	int mode = 0;
	Element container;
	NumberInputElement idInput;
	
	FieldBlock(String name, String blurb):super(name, blurb, null) {
		
	}
	
	Element createInnerElement() {
		this.innerElement = new DivElement();
		
		this.innerElement
			//..className = "ui"
			..innerHtml = "<div class='field' >${this.name}</span>"
			..title = this.blurb;
		
		this.readout = new DivElement()
			..className="enumreadout"
			..text="[No block specified]";
		this.innerElement.append(this.readout);
		
		this.container = new DivElement();
		
		Element radio = new DivElement();
		
		RadioButtonInputElement mode1 = new RadioButtonInputElement()
			..checked = true
			..id = "mode_0_${this.fieldid}"
			..name = "mode_${this.fieldid}"
			..value = "0"
			..addEventListener("change", (Event e) {
			FieldBlock f = fieldsByID[int.parse((e.target as Element).id.substring(7))];
			f.mode = 0;
			f.update();
		});
			
		LabelElement label1 = new LabelElement()
			..htmlFor="mode_0_${this.fieldid}"
			..text="Specify block ID:";
			
		NumberInputElement number = new NumberInputElement()
    		..step = "1"
    		..setAttribute("fieldid", "${this.fieldid}")
    		..value = "${this.blockID}"
    		..addEventListener("change", (Event e) {
    		NumberInputElement t = (e.target as NumberInputElement);
    		if (!isNumeric(t.value)) { t.value = "0"; }
    		t.value = "${double.parse(t.value).round()}";
    		FieldBlock f = fieldsByID[int.parse(t.getAttribute("fieldid"))];
    		f.blockID = int.parse(t.value);
    		f.update();
    	});
    	this.idInput = number;
		
		RadioButtonInputElement mode2 = new RadioButtonInputElement()
	        ..checked = false
	        ..id = "mode_1_${this.fieldid}"
			..name = "mode_${this.fieldid}"
			..value = "1"
			..addEventListener("change", (Event e) {
			FieldBlock f = fieldsByID[int.parse((e.target as Element).id.substring(7))];
			f.mode = 1;
			f.update();
		});
			
		LabelElement label2 = new LabelElement()
			..htmlFor="mode_1_${this.fieldid}"
			..text="Define block below:";
			
		radio.append(mode1);
		radio.append(label1);
		radio.append(number);
		radio.append(new BRElement());
		radio.append(mode2);
		radio.append(label2);
		
		container.append(radio);
		
		if (this.module != null) {
			container.append(module.createElement());
		}
		
		this.box = new CollapsingBox(this.fieldid, container);
		if (this.active && this.mode == 1) {
			this.box.expand();
		}
		this.innerElement.append(this.box.element);
		
		return this.innerElement;
	}
	
	void load(dynamic data) {
		if (data is Map) {
			this.module = new ModuleBlock(true);
			this.module.parentField = this;
			this.module.load(data);
			this.mode = 1;
		} else if (data is String) {
			this.mode = 0;
			String n = data;
			if (!isNumeric(n)) { n = "0"; }
			if (n.startsWith("0x")) { n = "${int.parse(n.substring(2), radix:16)}";}
			n = "${double.parse(n).round()}";
			this.blockID = int.parse(n);
		}
	}
	
	void updateSpecific(bool ticktock) {
		super.updateSpecific(ticktock);
		
		if (this.container != null) {
			(this.container.querySelector("#mode_0_${this.fieldid}") as RadioButtonInputElement).checked = this.mode == 0;
			(this.container.querySelector("#mode_1_${this.fieldid}") as RadioButtonInputElement).checked = this.mode == 1;
		}
		
		if (this.mode == 1 && this.module == null) {
			this.module = new ModuleBlock(true);
			this.module.parentField = this;
			this.module.update();
			if (this.container != null) {
				this.container.append(this.module.createElement());
				this.module.update();
			}
		}
		
		if (this.readout != null) {
			if (this.mode == 0) {
				int id = int.parse(this.idInput.value);
				ModuleBlock b = this.get();
				if (b != null && b.get("name") != "") {
					
					this.readout.text = "[Block with ID ${id}: \"${b.get("name")}\"]";
				} else {
					this.readout.text = "[Block with ID ${id}]";
				}
			} else {
				this.readout.text = "[Block defined inside${this.module.fields["name"].active ? ": \"${this.module.get("name")}\"" : ""}]";
			}
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		if (this.mode == 0) {
			saveWrite(buffer, "${showFieldName?"${this.name}=":""}${this.blockID},", 0);
			return true;
		} else {
			if (this.module != null) {
				saveWrite(buffer, "${this.name}=", indent, false);
				this.module.save(buffer, indent, false);
				return true;
			}
		}
		return false;
	}
	
	Field copy() { 
		FieldBlock f = new FieldBlock(this.name, this.blurb);
		f.mode = this.mode;
		f.blockID = this.blockID;
		f.module = this.module == null ? null : (this.module.copy()..parentField=f);
		return f;
	}
	
	Object get() {
		if (this.active) {
			if (this.mode == 0) {
				// lookup
				if (this.blockID > 0) {
					for (Component c in componentList.mapping.values) {
						if (c.module != null && c.module.get("ident") == this.blockID) {
							return c.module;
						}
					}
				}
			} else {
				if (this.module != null) {
					return this.module;
				}
			}
		}
		return null;
	}
}

abstract class FieldList extends Field {
	List<Field> subfields = [];
	CollapsingBox box;
	Element listcontainer = null;
	
	FieldList(String name, String blurb):super(name, blurb) {

	}
	
	Field addField() {
		Field sub = this.createSubField(this.subfields.length);
		sub.fixed = true;
		sub.active = true;
		this.subfields.add(sub);
		return sub;
	}
	
	void addSubElement(Field sub) {
		if (this.listcontainer != null) {
			Element item = new DivElement()..className="listcontainer";
			
			Element overlay = new DivElement()..className="listoverlay"..text="Delete?"..title="";
			
			Element ok = new SpanElement()..className="glyphicon glyphicon-ok"..title="Delete this item";
			Element no = new SpanElement()..className="glyphicon glyphicon-remove"..title="Keep this item";
			
			overlay.append(ok);
			addLeftClick(ok, (MouseEvent e){
				this.deleteSubfield(sub);
			});
			overlay.append(no);
			addLeftClick(no, (MouseEvent e){
				overlay.style.visibility="hidden";
			});
			
			item.append(overlay);
			
			Element remove = new DivElement()..className="listbutton glyphicon glyphicon-trash"
				..title="Delete item";
			addLeftClick(remove, (MouseEvent e) {
				overlay.style.visibility = "visible";
			});
			item.append(remove);
			
			Element e = sub.createInnerElement();
			item.append(e);
			
			this.listcontainer.append(item);
		}
	}
	
	Field createSubField(int id);
	
	void deleteSubfield(Field f) {
		this.subfields.remove(f);
		f.innerElement.parent.remove();
	}
	
	void updateSpecific(bool ticktock) {
    	super.updateSpecific(ticktock);
	}
	
	Element createInnerElement() {
		Element e = super.createInnerElement();
	
		this.listcontainer = new DivElement()..className="ui";
		
		DivElement addbox = new DivElement()..title="Add a new item to the list";//..className="ui";
		DivElement addbutton = new DivElement()..className="listbutton glyphicon glyphicon-star";
		
		addLeftClick(addbutton, (MouseEvent e) {
			this.addSubElement(this.addField());
			this.check();
			this.update();
		});
		
		addbox.append(addbutton);
		addbox.append(new SpanElement()..style.marginRight="13px"..text=" Add new item");
		this.listcontainer.append(addbox);
		
		
		for (Field f in this.subfields) {
			addSubElement(f);
		}
		
		this.box = new CollapsingBox(this.fieldid, this.listcontainer);
		e.append(box.element);
		if (this.active) {
			box.expand();
		}
		
		return e;
	}
	
	void copySubfields(List<Field> target) {
		for (Field f in this.subfields) {
			Field c = f.copy();
			c.active = f.active;
			c.fixed = f.fixed;
			target.add(c);
		}
	}
	
	Object get() {
		if (this.active) {
			List<dynamic> out = [];
			for(Field f in this.subfields) {
				out.add(f.get());
			}
			return out;
		}
		return [];
	}
	
	void load(dynamic data) {
		if (!(data is Map)) { return; }
		
		for (dynamic d in data.values) {
			Field f = this.addField();
			f.load(d);
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		saveWrite(buffer, "${showFieldName?"${this.name}=":""}{", indent);
		
		for (Field f in this.subfields) {
			f.save(buffer, indent:indent+1, showFieldName:false);
		}
		
		saveWrite(buffer, "},", indent);
		
		return false;
	}
}

class FieldShipList extends FieldList {
	FieldShipList(String name, String blurb):super(name, blurb) {}
	
	Field createSubField(int id) {
		return new FieldStringCompact("${this.name} #$id", "Save name of a ship, minus the .lua file extension.");
	}
	
	Field copy() {
		FieldList f = new FieldShipList(this.name, this.blurb);
		this.copySubfields(f.subfields);
		return f;
	}
}

class FieldShipGroups extends FieldList {
	FieldShipGroups(String name, String blurb):super(name, blurb) {}
	
	Field createSubField(int id) {
    	return new FieldShipList("Ship group", "A list of ship save names");
    }
	
	Field copy() {
		FieldList f = new FieldShipGroups(this.name, this.blurb);
		this.copySubfields(f.subfields);
		return f;
	}
}

class FieldFleetList extends FieldList {
	FieldFleetList(String name, String blurb):super(name, blurb) {}
	
	Field createSubField(int id) {
    	return new FieldFleet("Fleet", "Faction id and fleet spawn weight in P for the region");
    }
	
	Field copy() {
		FieldList f = new FieldFleetList(this.name, this.blurb);
		this.copySubfields(f.subfields);
		return f;
	}
}

class FieldShape extends Field {
	BlockShape shape;
	int scale = 1;
	int customShapeId = 0;
	bool needsListUpdate = true;
	
	Element readout;
	Element container;
	CollapsingBox box;
	
	List<ShapeDisplay> shapes = [];
	
	String loaded = "";
	
	FieldShape(String name, String blurb, [this.shape = null]):super(name, blurb) {
		if (this.shape == null) { this.shape = ShapeList.SQUARE; }
	}
	
	Element createInnerElement() {
		this.innerElement = new DivElement();
		
		this.innerElement
			..innerHtml = "<div class='field' >${this.name}</span>"
			..title = this.blurb;
		
		this.readout = new DivElement()
			..className="enumreadout"
			..text="[No block selected!]";
		this.innerElement.append(this.readout);
		
		this.container = new DivElement();
		
		this.scale = (this.parent.fields["scale"] as FieldInt).value;
		this.shapes = new List<ShapeDisplay>();
		//print("echo");
		List<BlockShape> shapes = ShapeList.getShapeList();
		//print("echo 2");
		for (BlockShape shape in shapes) {
			ShapeDisplay tile = new ShapeDisplay(shape, scale:this.scale, sel:shape == this.shape)
				..parentField = this;
			this.container.append(tile.element);
			this.shapes.add(tile);
		}
		
		this.box = new CollapsingBox(this.fieldid, container);
		this.innerElement.append(this.box.element);
		
		return this.innerElement;
	}
	
	void load(dynamic data) {
		if(data is String) {
			loaded = data;
			Map<String, BlockShape> shapes = ShapeList.getNameMap();
			if (shapes.containsKey(data)) {
				this.shape = shapes[data];
			} else {
				int bid = int.parse(data, onError:(String s){return -1;});
				if (bid != -1) {
					this.customShapeId = bid;
                    this.shape = ShapeList.MISSING;
				} else {
					this.shape = ShapeList.SQUARE;
				}
			}
		}
	}
	
	void updateSpecific(bool ticktock) {
		super.updateSpecific(ticktock);
		
		if (this.shape is CustomShape || this.shape == ShapeList.MISSING) {
			if (this.shape is CustomShape) {
				if ((this.shape as CustomShape).id != this.customShapeId) {
					this.shape = ShapeList.MISSING;
				} else if (!customShapeList.order.contains(this.shape)) {
					this.shape = ShapeList.MISSING;
				}
			} else {
				for (CustomShape s in customShapeList.order) {
					if (s.id == this.customShapeId) {
						this.shape = s;
						break;
					}
				}
			}
		}
		
		if (this.needsListUpdate && this.parent.parent == componentList.selected && this.innerElement != null) {
			this.needsListUpdate = false;
			bool open = this.box.expanded;
			Element c = this.innerElement.parent;
			this.innerElement.remove();
			this.innerElement = null;
			c.append(this.createInnerElement());
			if (open) {
				this.box.expand();
			}
		}
		
		if (this.readout != null) {
			if (this.shape == ShapeList.MISSING) {
				this.readout.text = "[Missing custom shape ID: ${this.customShapeId}]";
			} else if (this.shape is CustomShape){
				this.readout.text = "[Custom shape ID: ${(this.shape as CustomShape).id}]";
			} else {
				this.readout.text = "[${this.shape.name}]";
			}
		}
		
		FieldInt fs = (this.parent.fields["scale"] as FieldInt); 
		if ((fs.active && fs.value != this.scale) || (!fs.active && this.scale != 1)) {
			this.scale = fs.active ? fs.value : 1;
			for (ShapeDisplay tile in this.shapes) {
				tile.scale = this.scale;
				tile.update();
			}
		}
	}
	
	void selectShape(ShapeDisplay disp) {
		for (ShapeDisplay sd in this.shapes) {
			bool state = disp == sd;
			if (sd.selected != state) {
				sd.selected = state;
				sd.update();
			}
		}
		this.shape = disp.shape;
		if (this.shape is CustomShape) {
			this.customShapeId = (this.shape as CustomShape).id;
		}
		this.check();
		this.update();
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		if (this.shape != null) {
			saveWrite(buffer, "${showFieldName?"${this.name}=":""}${this.shape.name},", indent);
			return true;
		}
		return false;
	}
	
	Field copy() {
		return new FieldShape(this.name, this.blurb, this.shape);
	}
	
	Object get() {
		if (this.active) {
			if (this.shape != null) {
				int s = this.parent.get("scale");
				if (s <= this.shape.maxScale) {
					return this.shape;
				}
			}
			return ShapeList.MISSING;
		}
		return ShapeList.SQUARE;
	}
}

class FieldInt extends Field {
	int value = 0;
	int max = 0x7fffffff;
	int min = -0x7fffffff;
	int defaultval = 0;
	Function readoutfunction = null;
	Element readoutbox;
	
	FieldInt(String name, String blurb, [int this.value = 0, String this.readoutfunction(FieldInt f)]):super(name, blurb) {
		this.defaultval = this.value;
	}
	
	Element createInnerElement() {
    	Element e = super.createInnerElement();
    	
    	NumberInputElement number = new NumberInputElement()
    		..step = "1"
    		..value = "${this.value}"
    		..addEventListener("change", (Event e) {
    		NumberInputElement t = (e.target as NumberInputElement);
    		if (!isNumeric(t.value)) { t.value = "0"; }
    		t.value = "${double.parse(t.value).round().clamp(this.min, this.max)}";
    		this.value = int.parse(t.value);
    		this.check();
    		this.update();
    	});
    	
    	e.append(number);
    	
    	if (this.readoutfunction != null) {
    		number.className = "shortfield";
    		
    		this.readoutbox = new DivElement()
    			..className="inlineblock"
    			..text = this.readoutfunction(this);
    		e.append(this.readoutbox);
    	}
    	
    	return e;
	}
	
	void load(dynamic data) {
		if (data is int) {
			this.value = data;
		} else if(data is String) {
			this.value = int.parse(data);
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		saveWrite(buffer, "${showFieldName?"${this.name}=":""}${this.value},", indent);
		return true;
	}
	
	Field copy() {
		FieldInt f = new FieldInt(this.name, this.blurb, this.value);
		f.max = this.max;
		f.min = this.min;
		f.defaultval = this.defaultval;
		return f;
	}
	
	Object get() {
		if (this.active) {
			return this.value;
		}
		return this.defaultval;
	}
	
	void updateSpecific(bool ticktock) {
		if (this.readoutfunction != null && this.readoutbox != null) {
			this.readoutbox.text = this.readoutfunction(this);
		}
	}
}

class FieldUInt extends FieldInt {
	FieldUInt(String name, String blurb, [int value = 0, String readoutfunction(FieldInt f)]):super(name, blurb, 0, readoutfunction) {
		this.value = value;
		this.defaultval = value;
	}
	
	Element createInnerElement() {
		Element e = super.createInnerElement();

		(e.childNodes[1] as NumberInputElement).min = "0";
		
		return e;
	}
	
	Field copy() {
		FieldUInt f = new FieldUInt(this.name, this.blurb, this.value);
		f.max = this.max;
		f.min = this.min;
		f.defaultval = this.defaultval;
		return f;
	}
}

class FieldIdent extends FieldInt {
	FieldIdent(String name, String blurb, [int value = 0, String readoutfunction(FieldInt f)]):super(name, blurb, 0, readoutfunction) {
		this.value = value;
		this.defaultval = value;
	}
	
	Element createInnerElement() {
		Element e = super.createInnerElement();

		(e.childNodes[1] as NumberInputElement).min = "0";
		
		return e;
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		saveWrite(buffer, "${this.value},", indent);
		return true;
	}
	
	Field copy() {
		FieldIdent f = new FieldIdent(this.name, this.blurb, this.value);
		f.max = this.max;
		f.min = this.min;
		f.defaultval = this.defaultval;
		f.active = this.active;
		return f;
	}
}

class FieldDouble extends Field {
	double value = 0.0;
	double max = double.INFINITY;
    double min = double.NEGATIVE_INFINITY;
    double defaultval = 0.0;
    Function readoutfunction = null;
    Element readoutbox;
	
	FieldDouble(String name, String blurb, [double this.value = 0.0, String this.readoutfunction(FieldDouble f)]):super(name, blurb) {
		this.defaultval = this.value;
	}
	
	Element createInnerElement() {
    	Element e = super.createInnerElement();
    	
    	NumberInputElement number = new NumberInputElement()
    		..step = "0.01"
    		..value = "${this.value}"
    		..addEventListener("change", (Event e) {
    		NumberInputElement t = (e.target as NumberInputElement);
    		if (!isNumeric(t.value)) { t.value = "0"; }
    		if (!t.value.contains('.')) { t.value = t.value+".0"; }
    		t.value = "${double.parse(t.value).clamp(this.min, this.max)}";
    		this.value = double.parse(t.value);
    		this.check();
    		this.update();
    	});
    		
    	e.append(number);
    		
    	if (this.readoutfunction != null) {
    		number.className = "shortfield";
    		
    		this.readoutbox = new DivElement()
    			..className="inlineblock"
    			..text = this.readoutfunction(this);
    		e.append(this.readoutbox);
    	}
    	return e;
	}
	
	void load(dynamic data) {
		if (data is num) {
			this.value = data as double;
		} else if(data is String) {
			this.value = double.parse(data);
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		saveWrite(buffer, "${showFieldName?"${this.name}=":""}${this.value},", indent);
		return true;
	}
	
	Field copy() {
		FieldDouble f = new FieldDouble(this.name, this.blurb, this.value);
		f.max = this.max;
		f.min = this.min;
		f.defaultval = this.defaultval;
		f.readoutfunction = this.readoutfunction;
		return f;
	}
	
	Object get() {
		if (this.active) {
			return this.value;
		}
		return this.defaultval;
	}
	
	void updateSpecific(bool ticktock) {
		if (this.readoutfunction != null && this.readoutbox != null) {
			this.readoutbox.text = this.readoutfunction(this);
		}
	}
}

class FieldIntPairBase extends Field {
	int val0 = 0;
	int val1 = 0;
	
	String val0desc;
	String val0pre;
	String val1desc;
	String val1pre;
	
	FieldIntPairBase(String name, String blurb, String this.val0desc, String this.val1desc, String this.val0pre, String this.val1pre, [int this.val0 = 0, int this.val1 = 0]):super(name, blurb) {}
	
	Element createInnerElement() {
    	Element e = super.createInnerElement();
    	
    	NumberInputElement mult = new NumberInputElement()
    		..step = "1"
    		..className="pairfield"
    		..value = "${this.val0}"
    		//..title = "Multiplier value"
    		..title = this.val0desc
    		..addEventListener("change", (Event e) {
    		NumberInputElement t = (e.target as NumberInputElement);
    		if (!isNumeric(t.value)) { t.value = "0"; }
    		t.value = "${double.parse(t.value).round()}";
    		this.val0 = int.parse(t.value);
    		this.check();
    		this.update();
    	});
    		
		NumberInputElement add = new NumberInputElement()
    		..step = "1"
    		..className="pairfield"
    		..value = "${this.val1}"
			//..title = "Additive value"
			..title = this.val1desc
    		..addEventListener("change", (Event e) {
    		NumberInputElement t = (e.target as NumberInputElement);
    		if (!isNumeric(t.value)) { t.value = "0"; }
    		t.value = "${double.parse(t.value).round()}";
    		this.val1 = int.parse(t.value);
    		this.check();
            this.update();
    	});
    	
		//e.append(new SpanElement()..className="glyphicon glyphicon-remove"..title="Multiplier");
		e.append(new Element.html(this.val0pre));
    	e.append(mult);
    	//e.append(new SpanElement()..className="glyphicon glyphicon-plus"..title="Addition");
    	e.append(new Element.html(this.val1pre));
    	e.append(add);
    	return e;
	}
	
	void load(dynamic data) {
		if (data is Map) {
			Map m = data as Map;
			if (m.containsKey("0")) {
				this.val0 = int.parse(m["0"], onError:(String s) { return 0; });
			}
			if (m.containsKey("1")) {
				this.val1 = int.parse(m["1"], onError:(String s) { return 0; });
			}
		} else if (data is String){
			int v = int.parse(data);
			this.val0 = v;
			this.val1 = v;
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		saveWrite(buffer, "${showFieldName?"${this.name}=":""}{${this.val0}, ${this.val1}},", indent);
		return true;
	}
	
	Field copy() {
		return new FieldIntPairBase(this.name, this.blurb, this.val0desc, this.val1desc, this.val0pre, this.val1pre, this.val0, this.val1);
	}
	
	Object get() {
		if (this.active) {
			return {"val0":this.val0, "val1":this.val1};
		}
		return {"val0":0, "val1":0};
	}
}

class FieldDoublePairBase extends Field {
	double val0 = 0.0;
	double val1 = 0.0;
	
	String val0desc;
	String val0pre;
	String val1desc;
	String val1pre;
	
	FieldDoublePairBase(String name, String blurb, String this.val0desc, String this.val1desc, String this.val0pre, String this.val1pre, [double this.val0 = 1.0, double this.val1 = 0.0]):super(name, blurb) {}
	
	Element createInnerElement() {
    	Element e = super.createInnerElement();
    	
    	NumberInputElement mult = new NumberInputElement()
    		..step = "0.01"
    		..className="pairfield"
    		..value = "${this.val0}"
    		..title = this.val0desc
    		..addEventListener("change", (Event e) {
    		NumberInputElement t = (e.target as NumberInputElement);
    		if (!isNumeric(t.value)) { t.value = "0"; }
    		if (!t.value.contains('.')) { t.value = t.value+".0"; }
    		this.val0 = double.parse(t.value);
    		this.check();
    		this.update();
    	});
    		
		NumberInputElement add = new NumberInputElement()
    		..step = "0.01"
    		..className="pairfield"
    		..value = "${this.val1}"
			..title = this.val1desc
    		..addEventListener("change", (Event e) {
    		NumberInputElement t = (e.target as NumberInputElement);
    		if (!isNumeric(t.value)) { t.value = "0"; }
    		if (!t.value.contains('.')) { t.value = t.value+".0"; }
    		this.val1 = double.parse(t.value);
    		this.check();
            this.update();
    	});
    	
		if (this.val0pre != null) {
			e.append(new Element.html(this.val0pre));
		}
    	e.append(mult);
    	if (this.val1pre != null) {
    		e.append(new Element.html(this.val1pre));
    	}
    	e.append(add);
    	return e;
	}
	
	void load(dynamic data) {
		if (data is Map) {
			Map m = data as Map;
			if (m.containsKey("0")) {
				this.val0 = double.parse(m["0"], (String n){ return 0.0; });
			}
			if (m.containsKey("1")) {
				this.val1 = double.parse(m["1"], (String n){ return 0.0; });
			}
		} else if (data is String){
			double v = double.parse(data);
			this.val0 = v;
			this.val1 = v;
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		saveWrite(buffer, "${showFieldName?"${this.name}=":""}{${this.val0}, ${this.val1}},", indent);
		return true;
	}
	
	Field copy() {
		return new FieldDoublePairBase(this.name, this.blurb, this.val0desc, this.val1desc, this.val0pre, this.val1pre, this.val0, this.val1);
	}
	
	Object get() {
		if (this.active) {
			return {"0":this.val0, "1":this.val1};
		}
		return {"0":0.0, "1":0.0};
	}
}

class FieldDoublePairMinMax extends FieldDoublePairBase {
	FieldDoublePairMinMax(String name, String blurb, [double val0 = 0.0, double val1 = 0.0]):super(name, blurb, "Minimum value", "Maximum value", "<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>", "<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>", val0, val1) {}
}

class FieldIntPairMinMax extends FieldIntPairBase {
	FieldIntPairMinMax(String name, String blurb, [int val0 = 0, int val1 = 0]):super(name, blurb, "Minimum value", "Maximum value", "<span class='glyphicon glyphicon-triangle-bottom' title='Minimum'></span>", "<span class='glyphicon glyphicon-triangle-top' title='Maximum'></span>", val0, val1) {}
}

class FieldBooster extends FieldDoublePairBase {
	FieldBooster(String name, String blurb, [double val0 = 1.0, double val1 = 0.0]):super(name, blurb, "Multiplier value", "Additive value", "<span class='glyphicon glyphicon-remove' title='Multiplier'></span>", "<span class='glyphicon glyphicon-plus' title='Addition'></span>", val0, val1) {}
	
	Object get() {
		if (this.active) {
			return {"0":this.val0, "1":this.val1};
		}
		return {"0":1.0, "1":0.0};
	}
}

class FieldFleet extends FieldDoublePairBase {
	int faction;
	
	FieldFleet(String name, String blurb, [int this.faction=0, double outer=0.0, double inner=0.0]):super(name, blurb, "Inner point weight", "Outer point weight", null, null, outer, inner) {}
	
	Element createInnerElement() {
		this.innerElement = new DivElement();
		this.innerElement
			..title = this.blurb;
    	
    	NumberInputElement fac = new NumberInputElement()
    		..step = "1"
    		..className="pairfield"
    		..value = "${this.faction}"
    		..title="Faction"
    		..addEventListener("change", (Event e) {
    		NumberInputElement t = (e.target as NumberInputElement);
    		if (!isNumeric(t.value)) { t.value = "0"; }
    		t.value = "${double.parse(t.value).round()}";
    		this.faction = int.parse(t.value);
    		this.check();
    		this.update();
    	});
    	
    	NumberInputElement mult = new NumberInputElement()
    		..step = "0.01"
    		..className="pairfield"
    		..value = "${this.val0}"
    		..title = this.val0desc
    		..addEventListener("change", (Event e) {
    		NumberInputElement t = (e.target as NumberInputElement);
    		if (!isNumeric(t.value)) { t.value = "0"; }
    		if (!t.value.contains('.')) { t.value = t.value+".0"; }
    		this.val0 = double.parse(t.value);
    		this.check();
    		this.update();
    	});
    		
		NumberInputElement add = new NumberInputElement()
    		..step = "0.01"
    		..className="pairfield"
    		..value = "${this.val1}"
			..title = this.val1desc
    		..addEventListener("change", (Event e) {
    		NumberInputElement t = (e.target as NumberInputElement);
    		if (!isNumeric(t.value)) { t.value = "0"; }
    		if (!t.value.contains('.')) { t.value = t.value+".0"; }
    		this.val1 = double.parse(t.value);
    		this.check();
            this.update();
    	});
    	
		this.innerElement.append(new SpanElement()..text="#"..title="Faction number"..style.fontWeight="bold"..style.marginLeft="8px");
		this.innerElement.append(fac);
		this.innerElement.append(new SpanElement()..className="glyphicon glyphicon-record"..title = this.val0desc);
		this.innerElement.append(mult);
		this.innerElement.append(new SpanElement()..className="glyphicon glyphicon-fullscreen"..title = this.val1desc);
		this.innerElement.append(add);
    	return this.innerElement;
	}
	
	void load(dynamic data) {
		if (data is Map) {
			Map m = data as Map;
			
			if (m.containsKey("ident")) {
				this.faction=int.parse(m["ident"]);
			}
			
			for (dynamic d in m.values) {
				if (d is Map) {
					Map dm = d as Map;
					for (dynamic dd in dm.values) {
                    	if (dd is Map) {
                    		if (dd.length == 2) {
                    			if (dd.containsKey("0") && dd.containsKey("1")) {
                    				if (dd["0"]==0) {
                    					this.val0 = dd["1"].toDouble();
                    				}
                    				if (dd["0"]==1) {
                    					this.val1 = dd["1"].toDouble();
                    				}
                    			}
                    		}
                    	}
					}
				}
			}
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		saveWrite(buffer, "${showFieldName?"${this.name}=":""}{${this.faction}, { {0, ${this.val0}}, {1, ${this.val1}} }},", indent);
		return true;
	}
	
	Field copy() {
		return new FieldFleet(this.name, this.blurb, this.faction, this.val0, this.val1);
	}
	
	Object get() {
		if (this.active) {
			return {"faction":this.faction, "0":this.val0, "1":this.val1};
		}
		return {"faction":0, "0":0.0, "1":0.0};
	}
}

class FieldString extends Field {
	String value = "";
	
	FieldString(String name, String blurb, [String this.value = ""]):super(name, blurb) {}
	
	Element createInnerElement() {
    	Element e = super.createInnerElement();
    	
    	TextInputElement text = new TextInputElement()
    		..value = this.value
    		..addEventListener("change", (Event e) {
    		TextInputElement t = (e.target as TextInputElement);
    		this.value = t.value;
    		this.check();
    		this.update();
    	});
            	
    	e.append(text);
    	return e;
	}
	
	void load(dynamic data) {
		if(data is String) {
			this.value = data;
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		saveWrite(buffer, "${showFieldName?"${this.name}=":""}\"${this.value}\",", indent);
		return true;
	}
	
	Field copy() {
		return new FieldString(this.name, this.blurb, this.value);
	}
	
	Object get() {
    	if (this.active) {
    		return this.value;
    	}
    	return "";
	}
}

class FieldStringCompact extends FieldString {
	FieldStringCompact(String name, String blurb, [String value = ""]):super(name, blurb, value) {}
	
	Element createInnerElement() {
		this.innerElement = new DivElement();
		
		this.innerElement
			//..className = "ui"
			//..innerHtml = "<div class='field' >${this.name}</span>"
			..title = this.blurb;

    	TextInputElement text = new TextInputElement()
    		..className="compacttext"
    		..value = this.value
    		..addEventListener("change", (Event e) {
    		TextInputElement t = (e.target as TextInputElement);
    		this.value = t.value;
    		this.check();
    		this.update();
    	});
            	
    	this.innerElement.append(text);
    	return this.innerElement;
	}
	
	Field copy() {
		return new FieldStringCompact(this.name, this.blurb, this.value);
	}
}

class FieldLongString extends FieldString {
	FieldLongString(String name, String blurb, [String value = ""]):super(name, blurb, "") {
		this.value = value;
	}
	
	Element createInnerElement() {
		this.innerElement = new DivElement();
        		
		this.innerElement
			//..className = "ui"
			..innerHtml = "<div class='field' >${this.name}</span>"
			..title = this.blurb;
			
		Element e = this.innerElement;
    	
    	TextAreaElement text = new TextAreaElement()
    		..rows = 1
    		..value = this.value.replaceAll("\\n", "\n")
    		..addEventListener("change", (Event e) {
    		TextAreaElement t = (e.target as TextAreaElement);
    		
    		int rows = stringRows(t.value, 43);
            t.style.height = "auto";
            t.style.height = "${max(1,rows)*15+2}px";
    		
            this.value = t.value.replaceAll("\n", "\\n");
            this.check();
            this.update();
    	})
    		..addEventListener("input", (Event e) {
    		TextAreaElement t = (e.target as TextAreaElement);
    		int rows = stringRows(t.value, 43);
    		t.style.height = "auto";
            t.style.height = "${max(1,rows)*15+2}px";
    	});
    	int rows = stringRows(text.value, 43);
		text.style.height = "${max(1,rows)*15+2}px";
            	
    	e.append(text);
    	return e;
	}
	
	Field copy() {
		return new FieldLongString(this.name, this.blurb, this.value);
	}
}

class FieldColour extends Field {
	int red = 127;
	int green = 127;
	int blue = 127;
	int alpha = 255;
	
	bool hasAlpha = false;
	
	InputElement palette;
	InputElement opacity;
	InputElement hexfield;
	Element swatch;
	
	CollapsingBox box;
	
	FieldColour(String name, String blurb, [bool this.hasAlpha = false]):super(name, blurb) {}
	
	Element createInnerElement() {
    	Element e = super.createInnerElement();
    	
    	String inputid = "colour_${this.fieldid}";
    	
    	TextInputElement text = new TextInputElement();
    	text.id = inputid;
    	
    	Element haxbox = querySelector("#haxbox");
    	haxbox.append(text);
    	
    	js.JsObject picker = js.context["\$"].apply(["#$inputid"]);
    	picker.callMethod("spectrum", [new js.JsObject.jsify({
    		"color":this.composeStyleString(this.hasAlpha),
    		"preferredFormat":this.hasAlpha ? "hex8" : "hex",
    		"showInput":true,
    		"showPalette":true,
    		"palette" : new js.JsArray(),
    		"localStorageKey":this.hasAlpha ? "rwdk_alpha" : "rwdk",
    		"showAlpha": this.hasAlpha,
    		"showButtons": false,
    		"maxSelectionSize": 16
    	})]);
    	DivElement button = (picker.callMethod("spectrum", ["replacer"])[0] as DivElement);
		
    	picker.callMethod("on", ["change", (var event, var tinycolor){ 
    		this.decomposeString(tinycolor.toString());
    		
    		this.check();
    		this.update();
    	}]);
    	
    	text.remove();
    	e.append(text);
    	
    	button.remove();
        e.append(button);
    	
    	return e;
	}
	
	void destroyElement() {
		String inputid = "colour_${this.fieldid}";
		js.JsObject obj = js.context["\$"].apply(["#$inputid"]);
		obj.callMethod("spectrum", ["destroy"]);
		
		super.destroyElement();
	}
	
	void load (dynamic data) {
		if (data is String) {
			this.decomposeString(data, true);
		}
	}
	
	int compose([bool useAlpha = false]) {
		if(useAlpha) {
			return blue | (green << 8) | (red << 16) | (alpha << 24);
		}
		return blue | (green << 8) | (red << 16);
	}

	String composeString([bool useAlpha = false]) {
		if (useAlpha) {
			return compose(true).toRadixString(16).padLeft(8, "0");
		}
		return compose().toRadixString(16).padLeft(6, "0");
	}
	
	String composeStyleString([bool useAlpha = false]) {
		if (useAlpha) {
			return "rgba($red,$green,$blue,${alpha/255})";
		}
		return "#${composeString()}";
	}
	
	void decomposeString(String str, [bool load = false]) {
		int hex = 0;
		if (str.startsWith("#")) {
			str = "0x${str.substring(1)}";
		}
		if (str.startsWith("0x")) {
			hex = int.parse(str);
		} else {
			try {
				this.hexfield
					..className = ""
					..title = "";
				hex = int.parse(str, radix:16);
			} catch(e) {
				try {
					hex = int.parse(str);
				} catch(e2) {
					if (this.hexfield != null) {
						this.hexfield
							..className = "fielderror"
							..title = "Invalid hexadecimal value";
					}
					hex = 0x80808080;
				}
			}
		}
		
		if (str.length == 6) {
			if (load) {
				alpha = 255;
			}
		} else {
			alpha = (hex >> 24) & 0xFF;
		}
		red = (hex >> 16) & 0xFF;
		green = (hex >> 8) & 0xFF;
		blue = (hex) & 0xFF;
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		saveWrite(buffer, "${showFieldName?"${this.name}=":""}0x${this.composeString(this.hasAlpha)},", indent);
		return true;
	}
	
	Field copy() {
		FieldColour f = new FieldColour(this.name, this.blurb, this.hasAlpha);
		f.red = this.red;
		f.green = this.green;
		f.blue = this.blue;
		f.alpha = this.alpha;
		return f;
	}
	
	Object get() {
		if (this.active) {
			return {"r":this.red, "g":this.green, "b":this.blue, "a":this.alpha};
		}
		return null;
	}
	
	void updateSwatch() {
		if (this.palette != null) {
			this.palette.value = "#${this.composeString(false)}";
		}
		if (this.swatch != null) {
			this.swatch.style.backgroundColor = this.palette.value;
		}
		if (this.opacity != null) {
			this.opacity.value = "${this.alpha}";
		}
	}
}

class FieldEnum extends Field {
	bool exclusive = false;
	Map<RichEnum, bool> theEnum = new Map<RichEnum, bool>();
	Map<String, RichEnum> theEnumByName = new Map<String, RichEnum>();
	Element readout;
	CollapsingBox box;
	
	FieldEnum(String name, String blurb, List<RichEnum> theEnum, [bool this.exclusive = false]):super(name, blurb) {
		for (RichEnum r in theEnum) {
			this.theEnum[r] = false;
			this.theEnumByName[r.name] = r;
		}
	}
	
	Element createInnerElement() {
		Element e = super.createInnerElement();
		
		if (this.exclusive) {
			// dropdown of the limited values
			SelectElement list = new SelectElement();
			e.append(list);
			
			RichEnum selected = null;
			for (RichEnum r in theEnum.keys) {
				if (this.theEnum[r]) {
					selected = r;
					break;
				}
			}
			if (selected == null) {
				selected = theEnum.keys.first;
				theEnum[selected] = true;
			}
			
			for (RichEnum r in theEnum.keys) {
				OptionElement opt = new OptionElement();
				opt.value = r.name;
				opt.text = r.displayName;
				opt.title = r.blurb;
				list.append(opt);
			}
			list.value = selected.name;
			
			list.addEventListener("change", (Event e){
				for (RichEnum r in this.theEnum.keys) {
					this.theEnum[r] = false;
				}
				this.theEnum[this.theEnumByName[list.value]] = true;
				this.check();
			});
		} else {
			// tickboxes galore!
			
			DivElement div = new DivElement();
			/*this.readout = new SpanElement();
			div.append(this.readout);*/
			
			TableElement table = new TableElement();
			div.append(table);
			
			for(RichEnum r in this.theEnum.keys) {
				TableRowElement row = new TableRowElement();
				
				TableCellElement c1 = new TableCellElement();
				row.append(c1);
				
				CheckboxInputElement check = new CheckboxInputElement();
				check.setAttribute("fieldid", "${this.fieldid}");
				//check.setAttribute("enumid", r.saveName);
				check.checked = this.theEnum[r];
				check.id = "enum_${this.fieldid}_${r.name}";
				check.addEventListener("change", (Event e) {
					CheckboxInputElement c = (e.target as CheckboxInputElement);
					/*RichEnum r = RichEnum._namemap[check.getAttribute("enumid")];
					FieldEnum f = fieldsByID[int.parse(check.getAttribute("fieldid"))];
					f.theEnum[r] = c.checked;
					f.check();
					f.update();*/
					
					this.theEnum[r] = c.checked;
					this.check();
					this.update();
				});
				
				c1.append(check);
				
				TableCellElement c2 = new TableCellElement();
				
				LabelElement label = new LabelElement();
				label.className="enum";
				label.text = r.displayName;
				label.title = r.blurb;
				label.htmlFor = "enum_${this.fieldid}_${r.name}";
				c2.append(label);
				
                row.append(c2);

				table.append(row);
			}
			
			this.readout = new DivElement();
			this.readout.className = "enumreadout";
            e.append(this.readout);
			
            this.box = new CollapsingBox(this.fieldid, div);
			e.append(this.box.element);
		}
		
		return e;
	}
	
	void destroyElement() {
		if (readout != null) {
			readout = null;
		}
		
		super.destroyElement();
	}
	
	void updateSpecific(bool ticktock) {
		if (!this.exclusive && this.readout != null) {
			String out = "[";
			bool first = true;
			bool any = false;
			for (RichEnum r in this.theEnum.keys) {
				if (this.theEnum[r]) {
					any = true;
					if (first) {
						first = false;
					} else {
						out +="|<wbr>";
					}
					out += "<span title='${r.blurb}'>${r.name}</span>";
				}
			}
			out += "]";
			this.readout.innerHtml = out;
			if (!any) {
				this.uncheck();
			}
		}
	}
	
	void load(dynamic data) {
		if (!(data is String)) { return; }
		
		List<String> names = (data as String).split("|");
		//print(data);
		//print(this.theEnumByName);
		for(String name in names) {
			if (this.theEnumByName.containsKey(name)) {
				theEnum[theEnumByName[name]] = true;
				//print("blah: $name");
			}
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		String out = "";
		bool first = true;
		bool shouldSave = false;
		for (RichEnum r in this.theEnum.keys) {
			if (this.theEnum[r]) {
				if (first) {
					first = false;
				} else {
					out +="|";
				}
				out += r.name;
				shouldSave = true;
			}
		}
		
		if (shouldSave) {
			saveWrite(buffer, "${showFieldName?"${this.name}=":""}${out},", indent);
			return true;
		}
		return false;
	}
	
	Field copy() {
		List<RichEnum> e = new List<RichEnum>();
		for (RichEnum r in this.theEnum.keys) {
			e.add(r);
		}
		
		FieldEnum f = new FieldEnum(this.name, this.blurb, e);
		f.exclusive = this.exclusive;
		
		for (RichEnum r in this.theEnum.keys) {
			f.theEnum[r] = this.theEnum[r];
		}
		
		return f;
	}

	Object get() {
		if (this.active) {
			if (this.exclusive) {
				for (RichEnum val in this.theEnum.keys) {
					if (this.theEnum[val]) {
						return val;
					}
				}
			} else {
				List<RichEnum> vals = [];

				for (RichEnum val in this.theEnum.keys) {
					if (this.theEnum[val]) {
						vals.add(val);
					}
				}

				return vals;
			}
		}
		return null;
	}
}

class FieldEnumList extends FieldEnum {
	FieldEnumList(String name, String blurb, List<RichEnum> theEnum, [bool exclusive = false]):super(name, blurb,theEnum,exclusive) {}
	
	void updateSpecific(bool ticktock) {
		if (!this.exclusive && this.readout != null) {
			String out = "{ ";
			bool first = true;
			bool any = false;
			for (RichEnum r in this.theEnum.keys) {
				if (this.theEnum[r]) {
					any = true;
					if (first) {
						first = false;
					} else {
						out +=", ";
					}
					out += "<span title='${r.blurb}'>${r.name}</span>";
				}
			}
			out += " }";
			this.readout.innerHtml = out;
			if (!any) {
				this.uncheck();
			}
		}
	}
	
	void load(dynamic data) {
		if (!(data is Map)) { return; }
		
		for(var name in data.values) {
			String sname = name.toString();
			if (this.theEnumByName.containsKey(sname)) {
				theEnum[theEnumByName[sname]] = true;
			}
		}
	}
	
	bool save(StringBuffer buffer, {int indent:0, bool showFieldName:true}) {
		String out = "";
		bool first = true;
		bool shouldSave = false;
		for (RichEnum r in this.theEnum.keys) {
			if (this.theEnum[r]) {
				if (first) {
					first = false;
				} else {
					out +=",";
				}
				out += r.name;
				shouldSave = true;
			}
		}
		
		if (shouldSave) {
			saveWrite(buffer, "${showFieldName?"${this.name}=":""}{ ${out} },", indent);
			return true;
		}
		return false;
	}
	
	Field copy() {
		List<RichEnum> e = new List<RichEnum>();
		for (RichEnum r in this.theEnum.keys) {
			e.add(r);
		}
		
		FieldEnumList f = new FieldEnumList(this.name, this.blurb, e);
		f.exclusive = this.exclusive;
		
		for (RichEnum r in this.theEnum.keys) {
			f.theEnum[r] = this.theEnum[r];
		}
		
		return f;
	}
}