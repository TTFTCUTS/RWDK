part of RWDK;

class Ship {
	static final double drawScale = 0.1;
	static List<Ship> shipList = [];

	Element element;
	Element nameelement;
	Element factionelement;
	Element dirtyelement;
	Element deleteoverlay;
	List<ShipBlock> blocks = [];
	Set<int> blockids = new Set<int>();
	int faction;
	String name;
	BlockRenderer renderer;
	
	bool dirty = false;

	Ship(String filename) {
		this.renderer = new BlockRenderer(190,190)..showHardpoints=false;
		if (filename.endsWith(".lua")) {
			filename = filename.substring(0, filename.length - 4);
		}

		this.faction = 0;

		List<String> words = filename.split("_");

		if (words.length > 0) {
			int id = int.parse(words[0], onError: (e) => -1);
			if (id != -1) {
				this.faction = id;
			}
			words.removeAt(0);
		}

		String n = "";
		for (String word in words) {
			if (!n.isEmpty) {
				n += " ";
			}
			if (word.length > 1) {
				n += word.substring(0, 1).toUpperCase() + word.substring(1);
			} else {
				n += word.toUpperCase();
			}
		}

		this.name = n;

		shipList.add(this);
		echoToComponents();
	}

	void createElement() {
		Element div = new DivElement()..className = "ui shipbox";
		
		Element canvascontainer = new DivElement()
			..className="shipcanvascontainer";
		div.append(canvascontainer);
		
		Element bgleft = new DivElement()
			..className="shipbgleft";
		canvascontainer.append(bgleft);
		Element bgmid = new DivElement()
			..className="shipbgmid";
		canvascontainer.append(bgmid);
		Element bgright = new DivElement()
			..className="shipbgright";
		canvascontainer.append(bgright);
		
		canvascontainer.append(this.renderer.canvas);

		Element ename = new SpanElement()
			..className = "shipname"
			..text = "Ship name";
		this.nameelement = ename;
		canvascontainer.append(ename);

		Element efaction = new SpanElement()
			..className = "shipfaction"
			..text = "Faction";
		this.factionelement = efaction;
		canvascontainer.append(efaction);
		
		Element edirty = new SpanElement()
			..className = "shipdirty"
			..innerHtml='<i class="glyphicon glyphicon-floppy-remove"></i>'
			..title="This ship has had some block IDs rearranged and needs to be saved to keep the changes";
		this.dirtyelement = edirty;
		canvascontainer.append(edirty);
		
		Element save = new DivElement()
			..className="menu"
			..innerHtml='<div class="menuicon"><i class="glyphicon glyphicon-floppy-disk"></i></div>Save';
		addLeftClick(save, (MouseEvent e) {
			SaveWriter.saveShip(this);
		});
		div.append(save);
		
		Element redraw = new DivElement()
			..className="menu"
			..innerHtml='<div class="menuicon"><i class="glyphicon glyphicon-refresh"></i></div>Redraw';
		addLeftClick(redraw, (MouseEvent e) { this.draw(); });
		div.append(redraw);
		
		Element delete = new DivElement()
			..className="menu"
			..innerHtml='<div class="menuicon"><i class="glyphicon glyphicon-trash"></i></div>Remove';
		addLeftClick(delete, (MouseEvent e) {
			this.deleteoverlay.style.visibility="visible";
		});
		div.append(delete);

		//##################
		
		Element overlay = new DivElement()
			..className="shipoverlay"
			..innerHtml="Remove this ship?<br/>Any unsaved id changes<br/>will be lost.<br/><br/>";
		
		Element yes = new DivElement()
	        ..className="deletescreenbutton deleteyes glyphicon glyphicon-ok"
            ..title = "Remove the ship";
		addLeftClick(yes, (MouseEvent e){
			this.destroy();
		});
		overlay.append(yes);
		
		Element no = new DivElement()
	        ..className="deletescreenbutton deleteno glyphicon glyphicon-remove"
            ..title = "Keep the ship";
		addLeftClick(no, (MouseEvent e){
			this.deleteoverlay.style.visibility="hidden";
		});
		overlay.append(no);
		
		this.deleteoverlay = overlay;
		div.append(overlay);
		
		//##################
		
		this.element = div;
		querySelector("#shiplist").append(div);
		this.update();
		this.draw();
		echoToComponents();
	}

	void addBlock(ShipBlock block) {
		this.blocks.add(block);
		if (!this.blockids.contains(block.id)) {
			this.blockids.add(block.id);
		}
	}

	void update() {
		if (this.element != null) {
			this.nameelement.text = this.name;
			
			bool found = false;
			for (Faction f in factionList.order) {
				int id = f.module.get("ident");
				if (id == faction) {
					String name = f.module.get("name");
					if (!name.isEmpty) {
						this.factionelement.text = name;
						found = true;
					}
					break;
				}
			}
			if (!found) {
				this.factionelement.text = "F$faction";
			}
		}
		
		if (this.dirty) {
			this.dirtyelement.style.visibility="visible";
		} else {
			this.dirtyelement.style.visibility="hidden";
		}
	}

	Map<int, Component> evalParts() {
		Map<int, Component> parts = {};
		for (Component c in componentList.order) {
			int id = c.module.get("ident");
			if (this.blockids.contains(id)) {
				parts[id] = c;
			}
		}
		return parts;
	}
	
	void draw() {
		Map<int, Component> parts = this.evalParts();
		
		//print("parts: ${parts.keys}");
		//print("set: $blockids");
		
		if (parts.length != this.blockids.length) {
			//print("draw fail");
			this.renderer.clear();
			
			this.renderer.ctx
			..fillStyle="#A0A0A0"
			..font="${(this.renderer.height*0.35).floor()}px Droid Sans Mono"
			..textAlign="center"
			..fillText("?", this.renderer.width*0.5, this.renderer.height*0.5)
			..font="12px Droid Sans Mono"
			..fillText("Unable to draw ship", this.renderer.width*0.5, this.renderer.height*0.65)
			..fillText("due to missing blocks", this.renderer.width*0.5, this.renderer.height*0.65+18);
			
			return;
		}
		//print("draw is go!");
		
		List<ComponentWithPos> drawblocks = [];
		
		for(ShipBlock b in this.blocks) {
			drawblocks.add(new ComponentWithPos(parts[b.id], b.x*drawScale, b.y*drawScale, b.rot));
		}
		
		this.renderer.clear();
		this.renderer.drawComponentGroup(drawblocks, scaleoverride:10, angleoffset:-PI/8);
	}

	void reorder(Map<int,int> mapping) {
		this.blockids.clear();
		
		bool makedirty = false;
		for (ShipBlock b in this.blocks) {
			if (mapping.containsKey(b.id)) {
				if (b.id != mapping[b.id]) {
					b.id = mapping[b.id];
					makedirty = true;
				}
			}
			if (!this.blockids.contains(b.id)) {
				this.blockids.add(b.id);
			}
		}
		
		if (makedirty) {
			this.dirty = true;
			this.update();
		}
	}
	
	void destroy() {
		this.element.remove();
		shipList.remove(this);
		echoToComponents();
	}
	
	static void clearList() {
		for(int i=shipList.length-1; i>=0; i--) {
			shipList[i].destroy();
		}
	}
	
	static void redrawAll() {
		for(Ship s in shipList) {
			s.draw();
		}
	}
	
	static void updateAll() {
		for(Ship s in shipList) {
			s.update();
		}
	}
	
	static void echoToComponents() {
		for (Component c in componentList.order) {
			c.updateFromModule(false);
		}
	}
}

class ShipBlock {
	int id;
	double x;
	double y;
	double rot;
	Map<String, String> tags;

	ShipBlock(int this.id, double this.x, double this.y, double this.rot, Map<String, String> this.tags) {}
}
