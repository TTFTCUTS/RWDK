part of RWDK;

abstract class IModuleParent {
	void updateFromModule();
}

class Module {
	static String metatag = "rwdk";
	
	Map<String, Field> fields = new Map<String, Field>();
	Set<Field> breaks = new Set<Field>();
	List<Element> breakElements = new List<Element>();
	Map<String, dynamic> metadata = {};
	Element element;
	Field parentField;
	IModuleParent parent;
	bool updatestate = false;
	
	Field lastfield = null;
	
	Module() {}
	
	Element createElement() {
		this.element = new DivElement();

		this.element
			..className = "ui";
			//..text = "module";
		
		TableElement table = new TableElement();
        this.element.append(table);
		
		for (Field f in this.fields.values) {
			Element e = f.createElement();
			table.append(e);
			
			if (this.breaks.contains(f)) {
				Element be = new TableRowElement()
				..className="break"
				..innerHtml="<td colspan='2'><div class='break'></div></td>";
				table.append(be);
				breakElements.add(be);
			}
		}
		
		return this.element;
	}
	
	void destroyElement() {
		if (this.element == null) { return; }
		
		for (Field f in this.fields.values) {
			f.destroyElement();
		}
		
		this.element.remove();
		this.element = null;
	}
	
	void addField(Field f, [bool filter(Field f)]) {
		if (f == null) { return; }
		this.fields[f.name] = f;
		f.parent = this;
		if (filter != null) {
			f.showfilter = filter;
		}
		this.lastfield = f;
	}
	
	void addBreak() {
		if (this.lastfield == null) { return; }
		if (this.fields.containsValue(this.lastfield)) {
			this.breaks.add(this.lastfield);
		}
	}
	
	void updateInternal(bool ticktock) {
		if (this.updatestate != ticktock) {
			return;
		}
		
		this.updatestate = !this.updatestate;
		this.updateSpecific(ticktock);
		
		for (Field f in this.fields.values) {
			f.updateInternal(ticktock);
		}
		
		if (this.element != null) {
			for (Element e in this.breakElements) {
				TableElement t = this.element.children[0];
				int index = t.children.indexOf(e);
				
				int visibles = 0;
				bool hitbreak = false;
				if (index != 0) {
					for (int i=index-1; i>=0; i--) {
						Element child = t.children[i];
						if (child.className.contains("break")) {
							//hitbreak = true;
							break;
						} else {
							if (child.style.display != "none") {
								visibles++;
								break;
							}
						}
					}
				}
				if (index != t.children.length-1) {
					for (int i=index+1; i<t.children.length; i++) {
						Element child = t.children[i];
						if (child.className.contains("break")) {
							hitbreak = true;
							break;
						} else {
							if (child.style.display != "none") {
								visibles++;
								break;
							}
						}
					}
				}
				
				if (visibles > 0 && hitbreak == false) {
					e.style.display = "";
				} else {
					e.style.display = "none";
				}
			}
		}
		
		if (this.parentField != null) {
			this.parentField.updateInternal(ticktock);
		}
		if (this.parent != null) {
			this.parent.updateFromModule();
		}
	}
	
	void updateSpecific(bool ticktock) {
    		
    }
	
	void update() {
		this.updateInternal(this.updatestate);
	}
	
	void destroy() {
		this.destroyElement();
		for (Field f in this.fields.values) {
			f.destroy();
		}
	}
	
	void load(Map data) {
		data.forEach((String key, dynamic value) {
			if (Parser.redirects.containsKey(key)) {
				key = Parser.redirects[key];
			}
			if (this.fields.containsKey(key)) {
				this.fields[key].active = true;
				this.fields[key].load(value);
			} else if (key == metatag && data[key] is Map) {
				for (String k in data[key].keys) {
					this.metadata[k] = data[key][k];
				}
			}
		});
		this.update();
	}
	
	void save(StringBuffer buffer, [int indent = 0, bool firstindent = true]) {
		saveWrite(buffer, "{", firstindent ? indent : 0);
		
		for(Field f in this.fields.values) {
			if (f.active && f.shouldShow()) {
				f.save(buffer, indent:indent+1);
			}
		}
		
		if (this.metadata.isNotEmpty) {
			String meta = "-- $metatag={";
			for (String key in this.metadata.keys) {
				var data = this.metadata[key];
				print("$data, ${data.runtimeType}");
				meta += "$key=";
				if (data is String) {
					meta += "\"$data\",";
				} else {
					meta += "$data,";
				}
			} 
			meta += "},";
			saveWrite(buffer, meta, indent+1);
		}
		
		saveWrite(buffer, "},", indent);
	}
	
	Module copy() { 
		Module m = new Module();
		this.copyFields(m);
		m.update();
		return m;
	}
	
	void copyFields(Module target) {
		for (String s in this.fields.keys) {
			Field f = this.fields[s];
			
			Field f2 = f.copy()
				..fixed = f.fixed
				..active = f.active;
			if (f2 != null) {
				target.addField(f2, f.showfilter);
				
				if (this.breaks.contains(f)) {
					target.addBreak();
				}
			}
		}
	}
	
	Object get(String field) {
		if (this.fields.containsKey(field)) {
			return this.fields[field].get();
		}
		return null;
	}

	double getDouble(String field) {
		Object o = this.get(field);
		if (o is double) {
			return o;
		}
		return 0.0;
	}
}

class ModuleBlock extends Module {
	int calculatedP = 0;
	double deadliness = 0.0;
	bool hasCalculatedP = false;

	void calculatePValue() {
		double encounterTime = 15.0;
		double componentWidth = 10.0;
		double points = 0.0;

		bool isCommand = enumValModule(this, "features", EnumFeature.COMMAND);

		double durability = this.get("durability");
		BlockShape shape = this.get("shape");

		if (shape == ShapeList.MISSING) {
			this.calculatedP = 0;
			this.deadliness = 0.0;
			this.hasCalculatedP = false;
			return;
		}

		int scale = min(shape.maxScale, this.get("scale"));
		double area = shape.areas[scale-1] * 100.0;

		// durability
		if (durability > 4.0) {
			points += durability / 10.0 * max(100.0, area);
		} else {
			points += durability * 1000.0 / max(100.0, area);
		}

		// invulnerability
		if (enumValModule(this, "features", EnumFeature.INVULNERABLE)) {
			points += 1000000.0;
		}

		// cannon stats
		if (enumValModule(this, "features", EnumFeature.CANNON)) {
			ModuleCannon cannon = this.get("cannon");
			double roundsPerSec = enumValModule(this, "features", EnumFeature.CHARGING) ? (1.0 / this.get("chargeMaxTime")) : cannon.get("roundsPerSec");
			points += encounterTime * min(400.0, cannon.get("damage")) * roundsPerSec *
				(min(3000.0, cannon.get("range")) / 1200.0) *
				((cannon.get("muzzleVel") as double) / 1400.0).clamp(0.5, 2.0) *
				((cannon.get("explosive") != null) ? 2.0 * max(1.0, cannon.getDouble("explodeRadius") / componentWidth ) : 1.0) *
				(enumValModule(this, "features", EnumFeature.TURRET) ? 1.0 : 0.5);
		}

		// laser stats
		if (enumValModule(this, "features", EnumFeature.LASER)) {
			ModuleLaser laser = this.get("laser");
			double range = laser.get("range");

			double rng_pts = min(1500.0, range) / 1000.0;
			if (range < 500) {
				rng_pts /= 3.0;
			}
			if ((laser.get("pulsesPerSec") as double) > 0.0) {
				rng_pts *= laser.get("pulseAvailability");
			}
			if (enumValModule(this, "features", EnumFeature.TURRET)) {
				rng_pts *= 3.0;
			}
			if (enumValModule(this, "features", EnumFeature.CHARGING)) {
				rng_pts *= 2.0;
			}
			points += rng_pts * max(encounterTime * (laser.getDouble("damage")).abs(), 3.0 * sqrt(max(laser.get("immobilizeForce"), laser.get("linearForce"))));
		}

		// cannon booster
		if (enumValModule(this, "features", EnumFeature.CANNON_BOOST)) {
			ModuleCannonBoost boost = this.get("cannonBoost");
			points += encounterTime * 0.5 * (boost.get("damage") as Map)["1"];
			points += encounterTime * 20.0 * (boost.get("roundsPerSec") as Map)["0"];
			points += encounterTime * ((boost.get("range") as Map)["1"] / 100.0) * ((boost.get("muzzleVel") as Map)["1"] / 100.0);
		}

		// explosives
		if (enumValModule(this, "features", EnumFeature.EXPLODE)) {
			points += this.getDouble("explodeDamage") * max(1.0, this.getDouble("explodeRadius") / componentWidth);
		}

		// melee
		if (enumValModule(this, "features", EnumFeature.MELEE)) {
			points += 40.0 * this.get("meleeDamage");
		}

		// launchers
		if (enumValModule(this, "features", EnumFeature.LAUNCHER)) {
			ModuleBlock missile = this.get("replicateBlock");
			if (missile == null) {
				this.calculatedP = 0;
				this.hasCalculatedP = false;
				return;
			}
			missile.calculatePValue();
			double missileDeadliness = missile.deadliness;

			if (enumValModule(missile, "features", EnumFeature.COMMAND)) {
				missileDeadliness *= 1.5;
			} else {
				missileDeadliness *= 0.5;
			}
			points += encounterTime * missileDeadliness / this.get("replicateTime");
		}

		// shield
		if (enumValModule(this, "features", EnumFeature.SHIELD)) {
			ModuleShield shield = this.get("shield");
			points += (encounterTime * shield.get("regen") + shield.get("strength")) * (shield.getDouble("radius") / 50.0);
		}

		// thrusters
		if (enumValModule(this, "features", EnumFeature.THRUSTER)) {
			points += 2.5 * sqrt(this.getDouble("thrusterForce") * (max(1.0, this.getDouble("thrusterBoost")) / 2.0));
		}

		// generators
		if (enumValModule(this, "features", EnumFeature.GENERATOR)) {
			if (!isCommand) {
				points += 30.0 * this.get("generatorCapacityPerSec");
			}
		}

		// factory
		if (enumValModule(this, "features", EnumFeature.FACTORY)) {
			points += 10000.0;
		}

		// photosynth
		if (enumValModule(this, "features", EnumFeature.PHOTOSYNTH)) {
			points += this.getDouble("photosynthPerSec") * 1000.0;
		}

		// non-missile specific
		if (this.get("lifetime") == -1.0) {
			if (isCommand) {
				points += 500.0;
			}

			if (enumValModule(this, "features", EnumFeature.TRACTOR)) {
				points += 500.0;
			}
		}

		this.deadliness = points;
		this.calculatedP = (points / 100.0).round();
		this.hasCalculatedP = true;
	}

	ModuleBlock([bool spawned = false]) {
		this.addField(new FieldIdent("ident", "Block ID. Must be unique. Subject to relocation.")..setFixed(!spawned));
		this.addField(new FieldInt("group", "Faction ID of the faction this block belongs to.")..setFixed());
		this.addField(new FieldEnum("features", "Block features.", EnumFeature.values));
		this.addBreak();
		
		this.addField(new FieldString("name", "Block name, displayed in-game.", ""));
		this.addField(new FieldLongString("blurb", "Block description, displayed in-game."));
		this.addBreak();
		
		this.addField(new FieldShape("shape", "The shape which the block will take in-game. Some shapes cannot use certain scales."));
        this.addField(new FieldUInt("scale", "Block scale.", 1)..min=1..max=BlockShape.engineMaxScale);
        this.addField(new FieldColour("fillColor", "Primary block fill colour."));
        this.addField(new FieldColour("fillColor1", "Secondary block fill colour. Block colour cycles between fillColor and this. If left unspecified, defaults to the primary colour."));
        this.addField(new FieldColour("lineColor", "Block outline colour."));
        this.addBreak();
		
		this.addField(new FieldModule("command", "Command properties.", new ModuleCommand())..setFixed(), (Field f) => enumVals(f, "features", [EnumFeature.COMMAND, EnumFeature.SEED]));
		this.addBreak();

		this.addField(new FieldInt("points", "Points value (P cost) of the block. Will be calculated by the game if set to 0 or not specified. The estimate is not 100% accurate, but close enough in nearly all cases.", 0,
			(FieldInt f) {
				ModuleBlock b = f.parent;
				return "Auto P cost: ${b.hasCalculatedP ? b.calculatedP : "?"}";
			}
		));
		this.addField(new FieldDouble("durability", "Health = durability * block area.", 1.0, 
				(FieldDouble f) { 
					BlockShape b = f.parent.get("shape");
					int s = min(b.maxScale,f.parent.get("scale"));
					return "Block health: ${(f.value * b.areas[s-1]*100).toStringAsFixed(0)}";
				}
		));
		this.addField(new FieldDouble("density", "Mass = density * block area.", 0.1, 
				(FieldDouble f) { 
					BlockShape b = f.parent.get("shape"); 
					int s = min(b.maxScale,f.parent.get("scale"));
					return "Block mass: ${(f.value * b.areas[s-1]*100).toStringAsFixed(2)}";
				}
		));
		this.addField(new FieldDouble("growRate", "Block regrowth rate. Higher = faster.", 3.3, 
				(FieldDouble f) { 
					BlockShape b = f.parent.get("shape"); 
					int s = min(b.maxScale,f.parent.get("scale"));
					return "Growth time: ${((10/f.value) * sqrt(b.areas[s-1])).toStringAsFixed(1)}sec";
				}
		));
		this.addField(new FieldDouble("armor", "Reduces incoming damage from non-explosive projectile weapons by the amount specified. Totally ineffective against any other damage source, making it useless against most weapons in the game. Use is not recommended as it leads to confusing and inconsistent behaviour. Included only for completeness.", 0.0));
		this.addField(new FieldDouble("meleeDamage", "Melee damage multiplier for melee blocks.", 5.0), (Field f) => enumVal(f, "features", EnumFeature.MELEE));
		this.addField(new FieldDouble("lifetime", "Time before the block deconstructs. -1 is infinite.", -1.0));
		this.addField(new FieldEnum("bindingId", "Weapon button binding. Only required if you wish to override the default binding behaviour.", EnumBinding.values, true), (Field f) { return enumVal(f, "features", EnumFeature.CANNON) || enumVal(f, "features", EnumFeature.LASER) || enumVal(f, "features", EnumFeature.LAUNCHER); });
		this.addBreak();
		
		this.addField(new FieldDouble("seedLifetime", "Time before this seed expires when rooted. Checked instead of lifetime once the seed takes root.", 60.0), (Field f) => enumVal(f, "features", EnumFeature.SEED));
		this.addField(new FieldDouble("launchSpeed", "", 100.0), (Field f) => enumVal(f, "features", EnumFeature.SEED));
		this.addField(new FieldDouble("launchCapacity", ""), (Field f) => enumVal(f, "features", EnumFeature.SEED));
		this.addField(new FieldDouble("launchLifetime", "", -1.0), (Field f) => enumVal(f, "features", EnumFeature.SEED));
		this.addField(new FieldDouble("launchResources", ""), (Field f) => enumVal(f, "features", EnumFeature.SEED));
		this.addBreak();
		
		this.addField(new FieldModule("shield", "Shield properties. Reliant upon the SHIELD feature.", new ModuleShield())..setFixed(), (Field f) => enumVal(f, "features", EnumFeature.SHIELD));
		this.addBreak();
		
		this.addField(new FieldDouble("capacity", "R capacity of the block."));
		this.addField(new FieldDouble("tractorRange", "Resource collection range for tractor blocks.", 400.0), (Field f) => enumVal(f, "features", EnumFeature.TRACTOR));
        this.addField(new FieldDouble("photosynthPerSec", "Resources generated per second by photosynth blocks.", 1.0), (Field f) => enumVal(f, "features", EnumFeature.PHOTOSYNTH));
		this.addField(new FieldDouble("generatorCapacityPerSec", "Energy generated per second by generators."), (Field f) => enumVal(f, "features", EnumFeature.GENERATOR));
		this.addField(new FieldDouble("powerCapacity", "Energy capacity of generator blocks."), (Field f) => enumVal(f, "features", EnumFeature.GENERATOR));
		this.addBreak();
		
		this.addField(new FieldDouble("thrusterForce", "Force exerted by thruster blocks. Does not automatically scale with block size.", 10000.0), (Field f) => enumVal(f, "features", EnumFeature.THRUSTER));
		this.addField(new FieldDouble("thrusterBoost", "Thruster boost multiplier. Thrust is multiplied by this number for thrusterBoostTime seconds.", 2.0), (Field f) => enumVal(f, "features", EnumFeature.THRUSTER));
		this.addField(new FieldDouble("thrusterBoostTime", "Thruster boost time. Thrust is multiplied by thrusterBoost for this number of seconds.", 0.2), (Field f) => enumVal(f, "features", EnumFeature.THRUSTER));
		this.addField(new FieldColour("thrusterColor", "Primary thruster colour. Main trail is this colour.", true), (Field f) => enumVal(f, "features", EnumFeature.THRUSTER));
		this.addField(new FieldColour("thrusterColor1", "Secondary thruster colour. Flame immediately at the thruster is this colour. If left unspecified, defaults to thrusterColor.", true), (Field f) => enumVal(f, "features", EnumFeature.THRUSTER));
		this.addBreak();
		
		this.addField(new FieldDouble("torquerTorque", "Angular force applied by torquer blocks. Needs to be quite high to have any noticeable effect unless the ship is exceptionally light.", 10000.0), (Field f) => enumVal(f, "features", EnumFeature.TORQUER));
		this.addField(new FieldDouble("teleporterPower", "Energy per mass (calculated against total mass) required for teleport blocks to teleport a ship.", 4.0), (Field f) => enumVal(f, "features", EnumFeature.TELEPORTER));
		this.addBreak();		
		
		this.addField(new FieldModule("cannon", "Cannon properties. Reliant upon the CANNON feature.", new ModuleCannon())..setFixed(), (Field f) => enumVal(f, "features", EnumFeature.CANNON));
		this.addField(new FieldModule("cannonBoost", "Cannon booster properties. Reliant upon the CANNON_BOOST feature. Additions are applied together before multipliers.", new ModuleCannonBoost())..setFixed(), (Field f) => enumVal(f, "features", EnumFeature.CANNON_BOOST));
		this.addField(new FieldModule("laser", "Laser properties. Reliant upon the LASER feature.", new ModuleLaser())..setFixed(), (Field f) => enumVal(f, "features", EnumFeature.LASER));
		this.addField(new FieldDouble("turretSpeed", "Turret rotational speed in radians per second. 1 radian ~= 57.3 degrees.", 6.0, (FieldDouble f) { return degreeReadout(f)+"/sec"; }), (Field f) => enumVal(f, "features", EnumFeature.TURRET));
		this.addField(new FieldDouble("chargeMaxTime", "Time in seconds for charger weapons to achieve maximum charge.", 1.0), (Field f) => enumVal(f, "features", EnumFeature.CHARGING));
		this.addField(new FieldDouble("chargeMin", "Fraction of charge at which a charging weapon may fire.", 0.1), (Field f) => enumVal(f, "features", EnumFeature.CHARGING));
		this.addBreak();
		
		this.addField(new FieldDouble("explodeDamage", "Damage caused by blocks with the explode feature.", 51.0), (Field f) => enumVal(f, "features", EnumFeature.EXPLODE));
		this.addField(new FieldDouble("explodeRadius", "Blast radius for blocks with the explode feature.", 30.0), (Field f) => enumVal(f, "features", EnumFeature.EXPLODE));
		this.addBreak();
		
		this.addField(new FieldBlock("replicateBlock", "Spawned block properties. Reliant upon the LAUNCHER feature.")..setFixed(), (Field f) => enumVal(f, "features", EnumFeature.LAUNCHER)); // would loop
        this.addField(new FieldDouble("replicateTime", "Time required to build the launched block.", 1.0,
        	(FieldDouble f){
        		return "${(1.0/f.value).toStringAsFixed(1)}/sec";
        	}
        ), (Field f) => enumVal(f, "features", EnumFeature.LAUNCHER));
		this.addField(new FieldDouble("launcherPower", "Power required to build a single launched block."), (Field f) => enumVal(f, "features", EnumFeature.LAUNCHER));
		//this.addField(new FieldDouble("launcherSpeed", ""), (Field f) => enumVal(f, "features", EnumFeature.LAUNCHER));
		this.addField(new FieldDouble("launcherOutSpeed", ""), (Field f) => enumVal(f, "features", EnumFeature.LAUNCHER));
		this.addField(new FieldDouble("launcherAngVel", ""), (Field f) => enumVal(f, "features", EnumFeature.LAUNCHER));
	}

	void updateSpecific(bool ticktock) {
		this.calculatePValue();
	}

	ModuleBlock copy() { 
		ModuleBlock m = new ModuleBlock();
		this.copyFields(m);
		m.update();
		return m;
	}
}

class ModuleCannon extends Module {
	ModuleCannon() {
		this.addField(new FieldDouble("damage", "Damage per round.", 0.0,
			(FieldDouble f) {
				double rof = f.parent.get("roundsPerSec");
				return "DPS: ${(f.value*rof*10).round()/10}";
			}
		));
		this.addField(new FieldDouble("power", "Power consumed per shot fired."));
		this.addField(new FieldDouble("roundsPerSec", "Shots fired per second."));
		this.addField(new FieldDouble("muzzleVel", "Velocity of fired rounds."));
		this.addField(new FieldDouble("range", "Weapon range. Rounds are destroyed when reaching this distance."));
		this.addField(new FieldDouble("spread", "Maximum random deviation from weapon facing, measured in radians. 1 radian ~= 57.3 degrees.", 0.0, degreeReadout));
		this.addBreak();
		
		this.addField(new FieldUInt("roundsPerBurst", "Number of rounds in each burst when burstyness is greater than zero.", 1));
		this.addField(new FieldDouble("burstyness", "Measures how tight burst fire is. Example: 3 rounds per burst, 1 round per second - 0.0 = one round every second. 0.5 = three rounds spaced half of a second apart, followed by a 1.5 second pause. 1.0 = all three shots at once, followed by a 3 second pause."));
		this.addBreak();
		
		this.addField(new FieldColour("color", "Colour of rounds."));
		this.addBreak();
		
		this.addField(new FieldEnum("explosive", "Explosive behaviour of fired projectiles. For no explosion, leave this unchecked.", EnumExplosion.values, true));
		this.addField(new FieldDouble("explodeRadius", "Explode radius of the round when explosions are enabled."));
	}
}

class ModuleLaser extends Module {
	ModuleLaser() {
		this.addField(new FieldDouble("damage", "Damage per second."));
		this.addField(new FieldDouble("power", "Power consumed per second."));
		this.addField(new FieldDouble("range", "Length of beam."));
		this.addField(new FieldDouble("width", "Beam width. Units not specified by game docs."));
		this.addBreak();
		
		this.addField(new FieldColour("color", "Beam colour.", true));
		this.addBreak();
		
		this.addField(new FieldDouble("linearForce", "Directional force applied to targets along the direction of the beam. Positive pushes targets away, negative draws them closer."));
		this.addField(new FieldDouble("immobilizeForce", "Immobilisation force applied to targets, keeping them in the same relative position as when hit. Higher values must be countered with more thrust to escape.")..min=0.0);
		this.addBreak();
		
		this.addField(new FieldDouble("decay", "Fraction of time between shots that it takes for the laser to fade away.", 0.35));
		this.addField(new FieldDouble("pulsesPerSec", ""));
        this.addField(new FieldUInt("pulsesPerBurst", "", 1));
        this.addField(new FieldDouble("pulseAvailability", ""));
		this.addField(new FieldDouble("burstyness", ""));
		this.addBreak();
		
		this.addField(new FieldEnum("explosive", "Explosive behaviour of the beam. For no explosion, leave this unchecked.", EnumExplosion.values, true));
		this.addField(new FieldDouble("explodeRadius", "Explosion radius at the beam contact point when explosions are enabled in the cannon section."));
	}
}

class ModuleCommand extends Module {
	ModuleCommand() {
		this.addField(new FieldEnum("flags", "Command behaviour flags.", EnumCommand.values));
		this.addField(new FieldInt("faction", "Faction ID which this core will be assigned to when created."));
		this.addField(new FieldString("blueprint", "When specified, this type of core will only build into this blueprint. Filename minus extension (20_test.lua -> 20_test)."));
	}
}

class ModuleCannonBoost extends Module {
	ModuleCannonBoost() {
		this.addField(new FieldBooster("damage", "Projectile damage."));
		this.addField(new FieldBooster("explodeRadius", "Explosion radius. Only valid if 'explosive' is set."));
		this.addField(new FieldBooster("muzzleVel", "Projectile velocity."));
		this.addField(new FieldBooster("power", "Energy consumption per shot."));
		this.addField(new FieldBooster("range", "Projectile range."));
		this.addField(new FieldBooster("roundsPerSec", "Rounds fired per second."));
	}
}

class ModuleShield extends Module {
	ModuleShield() {
		this.addField(new FieldDouble("strength", "Shield health.", 100.0));
		this.addField(new FieldDouble("regen", "Health regenerated per second. Also power per second needed to regenerate.", 20.0));
		this.addField(new FieldDouble("radius", "Shield size.", 40.0));
		this.addField(new FieldDouble("delay", "Delay in seconds after collapse before a shield begins to regenerate.", 3.0));
		this.addField(new FieldDouble("armor", "Reduces incoming damage from non-explosive projectile weapons by the amount specified. Totally ineffective against any other damage source, making it useless against most weapons in the game. Use is not recommended as it leads to confusing and inconsistent behaviour. Included only for completeness.", 0.0));
		this.addBreak();
		
		this.addField(new FieldColour("color", "Shield colour when stable. Brighter colours appear more opaque.", true));
		this.addField(new FieldColour("lineColor", "Shield edge colour.", true));
		this.addField(new FieldColour("damagedColor", "Shield colour when taking damage. Brighter colours appear more opaque.", true));
	}
}

// NON-BLOCK MODULES ########################################################

class ModuleFaction extends Module {
	ModuleFaction() {
		this.addField(new FieldIdent("ident", "Faction id. Used in block 'group' fields and the start of ship file names to associate them with the faction.")..setFixed());
		this.addField(new FieldString("name", "Faction name as it will appear in-game."));
		this.addField(new FieldEnum("playable", "Whether the faction is selectable by the player, and if it needs to be unlocked first.", EnumPlayable.values, true));
		this.addField(new FieldString("start", "Starter ship blueprint. Filename minus extension (20_test.lua -> 20_test)."));
		this.addField(new FieldUInt("primaries","Number of faction colours.",2)..min=0..max=3 );
		this.addField(new FieldColour("color0", "First faction colour"), (Field f) {return (f.parent.fields["primaries"] as FieldUInt).value > 0;});
		this.addField(new FieldColour("color1", "Second faction colour"), (Field f) {return (f.parent.fields["primaries"] as FieldUInt).value > 1;});
		this.addField(new FieldColour("color2", "Third faction colour"), (Field f) {return (f.parent.fields["primaries"] as FieldUInt).value > 2;});
		this.addField(new FieldEnum("aiflags", "Ship behaviour flags. Applied to all ships on the side, added to by any flags set in individual command modules.", EnumCommand.values));
	}
	
	ModuleFaction copy() { 
		ModuleFaction m = new ModuleFaction();
		this.copyFields(m);
		m.update();
		return m;
	}
	
	void save(StringBuffer buffer, [int indent = 0, bool firstindent = true]) {
		saveWrite(buffer, "${this.fields["ident"].get()} = {", firstindent ? indent : 0);
		
		for(Field f in this.fields.values) {
			if (f.name == "ident") { continue; }
			if (f.active && f.shouldShow()) {
				f.save(buffer, indent:indent+1);
			}
		}
		
		saveWrite(buffer, "},", indent);
	}
}

class ModuleRegion extends Module {
	ModuleRegion() {
		this.addField(new FieldInt("ident", "Region ID")..setFixed());
		this.addField(new FieldColour("color", "Region colour override. Defaults to an average of the controlling faction's colours."));
		this.addField(new FieldInt("faction", "Controlling faction ID"));
		this.addField(new FieldUInt("count", "Number of regions in the galaxy"));
		this.addField(new FieldDoublePairMinMax("position", "Positional range of the centre of the region. 0.0 = centre, 1.0 = edge", 0.1, 1.0));
		this.addField(new FieldDoublePairMinMax("radius", "Size range of the region as a fraction of the map radius. 0.1 = 10%", 0.1, 0.15));
		//totalsize
		this.addField(new FieldEnum("type", "Shape of this region when added to the map. Default is voronoi regions.", EnumRegionType.values, true));
		this.addBreak();
		
		this.addField(new FieldFleetList("fleets", "Fleets which could spawn in the region. Faction ID paired with a P weight at the edge and centre of the region."));
		this.addField(new FieldIntPairMinMax("fleetCount", "Number of ships per fleet", 8, 15));
		this.addField(new FieldDouble("fleetFraction", "?", 0.75));
		this.addBreak();
		
		this.addField(new FieldShipList("fortress", "Fortress designs. These ships will appear guarding deactivated stations in the region."));
		this.addField(new FieldIntPairMinMax("fortressCount", "Number of fortresses in the region", 3, 6));
		this.addField(new FieldDoublePairMinMax("fortressRadius", "Distance from station markers to place fortresses.", 500.0, 500.0));
		this.addBreak();
		
		this.addField(new FieldShipGroups("unique", "Unique groups of ships which may appear exactly as specified in the region."));
		this.addField(new FieldDouble("uniqueFraction", "?", 0.25));
		this.addBreak();
		
		this.addField(new FieldEnumList("ambient", "The type of ambient plants which generate on ENVIRONMENTAL blocks in the region", EnumPlant.values));
		this.addField(new FieldDoublePairMinMax("asteroidDensity", "Density of asteroids in the region. 0.0-1.0", 0.0, 0.4));
		this.addField(new FieldIntPairMinMax("asteroidSize", "Size in blocks of asteroids in the region"));
		this.addField(new FieldEnum("asteroidFlags", "Properties for asteroids in the region. Not specifying any shape types will choose randomly.", EnumAsteroidFeature.values));
		//subregions
	}
	
	ModuleRegion copy() { 
		ModuleRegion m = new ModuleRegion();
		this.copyFields(m);
		m.update();
		return m;
	}
}