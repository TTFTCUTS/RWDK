part of RWDK;

// load parser
class Parser {
	static RegExp JSONify1 = new RegExp(r'\b([\w|\.]+)\b[\s\n\r]*=[\s\n\r]*([^",;{}\n\r]+),*'); // handle normal entries
	static RegExp JSONify2 = new RegExp(r'\b([\w|\.]+)\b[\s\n\r]*=[\s\n\r]*([{"])'); // handle block and string entries
	static RegExp JSONify3 = new RegExp(r'(.)[\s\n\r]*{[\s\n\r]*([\d]+|0[xX][0-9a-fA-F]+)[\s\n\r]*,'); // handle block starts and idents
	static RegExp JSONify4 = new RegExp(r'(--|#).*[\n\r]'); // strip comments
	static RegExp JSONify5 = new RegExp(r',[\s\n\r]*}'); // remove extra commas
	static RegExp JSONify6 = new RegExp(r'(["}])\s*[\n\r]'); // add missing commas for brackets
	//static RegExp JSONify7 = new RegExp(r'{[\s\n\r]*([-\d\.]+)[\s\n\r]*,[\s\n\r]*([-\d\.]+)[\s\n\r]*}'); // number pairs
	static RegExp JSONify7 = new RegExp(r'{([\s\n\r]*([-\d\.]+|"[\w\d\s-^"]+"|[\w_]+)[\s\n\r]*,*)+[\s\n\r]*}'); // number or string groups
	static RegExp JSONify8 = new RegExp(r'(})[\s\n\r]*([^,}])'); // add commas between blocks
	static RegExp JSONify9 = new RegExp(r'(\\)'); // escape stuff
	static RegExp JSONify10 = new RegExp(r'(=[\s\n\r]*"[^"]*")([\s\n\r]*[^,])'); // add missing commas after strings
	static RegExp JSONify11 = new RegExp(r'=\s*_\("(.*)"\)'); // strip _() for vanilla stuff
	//static RegExp JSONify12 = new RegExp(r'{(\d+),\s*{\s*([-\d\.]+)\s*,\s*([-\d\.]+)\s*},\s*([-\d\.]+[^}]*)}'); // fix rotations in ship files
	static RegExp JSONify12 = new RegExp(r'{([\d]+|0[xX][0-9a-fA-F]+)(,\s*{\s*([-\d\.]+)\s*,\s*([-\d\.]+)\s*})?,*\s*(([-\d\.]+[^}]*,*)*|(\w*=(.|{.*}),*)*)}'); // parse ship block entries
	static RegExp JSONify13 = new RegExp(r'([^:\s\n\r][\s\n\r]*)(?={)'); // add missing identifiers
	static RegExp JSONify14 = new RegExp(r'"[\w\d\s-^"]+"|[-\d\.]+|[\w_]+'); // article finding for group submatches
	
	// map of deprecated field names and their correct replacements
	static Map<String, String> redirects = {
		"blockscale" : "scale",
		"blockshape" : "shape"
	};
	
	static void loadBlocksFile(File file) {
		loadFile(file, (File file, Map json) {
			if (!file.name.split(".")[0].contains("block")) {
				alertbox("Warning!", "Selected file (\"${file.name}\") is probably not a blocks file! Make sure the file name contains the word 'block' if you are sure it is a blocks file.");
				return;
			}
			if (json != null) {
				loadBlocksFromJson(json);
			}
		});
	}
	
	static void loadShapesFile(File file) {
		loadFile(file, (File file, Map json) {
			if (!file.name.split(".")[0].contains("shapes")) {
				alertbox("Warning!", "Selected file (\"${file.name}\") is probably not a shapes file! Make sure the file name contains the word 'shapes' if you are sure it is a blocks file.");
				return;
			}
			if (json != null) {
				loadShapesFromJson(json);
			}
		});
	}
	
	static void loadFactionsFile(File file) {
		loadFile(file, (File file, Map json) {
			if (!file.name.split(".")[0].contains("faction")) {
				alertbox("Warning!", "Selected file (\"${file.name}\") is probably not a factions file! Make sure the file name contains the word 'faction' if you are sure it is a factions file.");
				return;
			}
			if (json != null) {
				loadFactionsFromJson(json);
			}
		});
	}
	
	static void loadRegionsFile(File file) {
		loadFile(file, (File file, Map json) {
			if (!file.name.split(".")[0].contains("region")) {
				alertbox("Warning!", "Selected file (\"${file.name}\") is probably not a regions file! Make sure the file name contains the word 'region' if you are sure it is a blocks file.");
				return;
			}
			if (json != null) {
				loadRegionsFromJson(json);
			}
		}, loadwrapper:(String content) => "{$content}");
	}
	
	static RegExp shipfilename = new RegExp(r'\d+_');
	static void loadShipFile(File file) {
		loadFile(file, (File file, Map json) {
			if (!file.name.startsWith(shipfilename)) {
				alertbox("Warning!", "Selected file (\"${file.name}\") is probably not a ship file! Make sure the file name starts with a number followed by '_' (e.g. 2_awesomefighter.lua) if you are sure it is a ship file.");
				return;
			}
			if (json != null) {
				loadShipFromJson(file, json);
			}
		}, ship:true);
	}
	
	static void loadFile(File file, void callback(File file, Map json), {String loadwrapper(String content), bool ship:false}) {
		if (!file.name.endsWith(".lua")) {
			alertbox("File Parsing Failed:", "Please select a .lua file.");
			return;
		}
		
		FileReader reader = new FileReader();
		
		reader.readAsText(file);
		
		reader.addEventListener("load", (ProgressEvent fe) {
			FileReader r = fe.target;
			
			String content = r.result;
			
			if (loadwrapper != null) {
				content = loadwrapper(content);
			}
			
			var json = parseFile(content, ship:ship);
			
			//print(json);

			if (callback != null) {
				callback(file, json);
			}
		});
	}
	
	static dynamic parseFile(String content, {bool ship:false}) {
		// decomment meta blocks
		content = content.replaceAll("-- ${Module.metatag}", Module.metatag);
		
		// remove comments
		content = content.replaceAllMapped(JSONify4, (Match match) {
			return '';
		});
		
		content = content.substring(content.indexOf("{"), content.lastIndexOf("}")+1);
		
		if (!content.startsWith("{") || !content.endsWith("}")) {
			print("NOPE: not within braces!");
			return null;
		}

		// ESCAPE
		content = content.replaceAllMapped(JSONify9, (Match match) {
			return '\\\\';
		});
		
		// remove _()
		content = content.replaceAllMapped(JSONify11, (Match match) {
			return '="${match.group(1)}"';
		});
		
		// ship blocks
		if (ship) {
			int blockid = 0;
			content = content.replaceAllMapped(JSONify12, (Match match) {
				String out = '"${blockid++}":{"blockid":"${match.group(1)}", "pos":{"0":${match.group(3) == null ? 0.0 : match.group(3)},"1":${match.group(4) == null ? 0.0 : match.group(4)}}';
				
				if (match.groupCount >= 7) {
					for (int i=6; i<match.groupCount; i++) {
						String m = match.group(i);
						
						if (m != null) {
							List<String> subm = m.split(",");
							
							for (String sub in subm) {
								sub = sub.trim();
								if (double.parse(sub, (e) => null) != null) {
									out += ', "rotation":$sub';
								} else {
									out += ", $sub";
								}
							}
						}
					}
				}
				
				return out + "}";
			});
		}
		
		// missing commas after strings
		content = content.replaceAllMapped(JSONify10, (Match match) {
			return '${match.group(1)},${match.group(2)}';
		});
		
		// handle block and string entries
		content = content.replaceAllMapped(JSONify2, (Match match) {
			return '"${match.group(1)}":${match.group(2)}';
		});
		
		// handle normal entries
		content = content.replaceAllMapped(JSONify1, (Match match) {
			return '"${match.group(1)}":"${match.group(2)}",';
		});
		
		// handle number pairs
		/*content = content.replaceAllMapped(JSONify7, (Match match) {
			return '{ "0":${match.group(1)}, "1":${match.group(2)}}';
		});*/
		
		content = content.replaceAllMapped(JSONify7, (Match match) {
			String block = match.group(0);
			int bid = 0;
			block = block.replaceAllMapped(JSONify14, (Match submatch) {
				String match = submatch.group(0);
				//print(match);
				if ((r'[\w_]+').lastIndexOf(match) != null) {
					return '"${bid++}":"$match"';
				}
				return '"${bid++}":$match';
			});
			
        	return block;
        });
		
		// handle block starts + ident values
		content = content.replaceAllMapped(JSONify3, (Match match) {
			if (match.group(1) == ":") {
				return '${match.group(1)} { "ident":${match.group(2)},';
			}
			return '${match.group(1)} "${match.group(2)}":{ "ident":"${match.group(2)}",';
		});

		// missing identifiers
		int ident = 0;
		content = content.replaceAllMapped(JSONify13, (Match match) {
			return '${match.group(1)} "${ident++}":';
		});
		//content = content.substring(4);
		
		// handle extra commas
		content = content.replaceAllMapped(JSONify5, (Match match) {
			return '}';
		});
		
		// handle missing commas - will add in the wrong place if there's a double right bracket!
		content = content.replaceAllMapped(JSONify6, (Match match) {
			return '${match.group(1)},';
		});
		
		// should put commas between blocks that have them missing?
		content = content.replaceAllMapped(JSONify8, (Match match) {
			return '${match.group(1)}, ${match.group(2)}';
		});
		
		// cull extra commas again to fix the previous issue
		content = content.replaceAllMapped(JSONify5, (Match match) {
			return '}';
		});
		
		//print("##################################################################");
		//print(content);
		
		JsonDecoder decoder = new JsonDecoder();
		
		Map json = null;
		try {
			json = decoder.convert(content);
		} catch (e) {
			//print(e);
			alertbox("File Parsing Failed:", e);
			return null;
		}
		
		//querySelector("#main").append(makeDebugElement(json));

		return json;
	}
	
	static Element makeDebugElement(Map data, [bool first = true]) {
		Element ele = new TableElement();
		ele.className="debug";
		
		Element container;
		if (first) {
			container = new DivElement();

			Element remove = new DivElement();
			remove..text="Remove debug readout"
				..className = "ui"
				..addEventListener("click", (MouseEvent e){
				(e.target as Element).parent.remove();
			});
			container.append(remove);
			
			container.append(ele);
		}
		
		data.forEach((String key, dynamic value) {
			Element row = new TableRowElement();
				
			Element c1 = new TableCellElement();
			c1.text = key;
			row.append(c1);
			
			Element c2 = new TableCellElement();
			if (value is Map) {
				c2.append(makeDebugElement(value, false));
			} else {
				c2.text = "${value}";
			}
			row.append(c2);
			
			ele.append(row);
		});
		
		if (first) { return container; }
		return ele;
	}
	
	static void loadBlocksFromJson(Map data) {
		data.forEach((String key, dynamic value) {
			if (value is Map) {
				ModuleBlock block = new ModuleBlock();
				block.load(value);
				
				Component comp = new Component(block);
				componentList.add(comp);
			}
		});
	}
	
	static void loadShapesFromJson(Map data) {
		data.forEach((String key, dynamic value) {
			if (value is Map) {
				CustomShape s = CustomShape.load(value);
				customShapeList.add(s);
			}
		});
	}
	
	static void loadFactionsFromJson(Map data) {
		data.forEach((String key, dynamic value) {
			if (value is Map) {
				value["ident"] = key; // adds faction idents
				ModuleFaction mf = new ModuleFaction();
				mf.load(value);
				
				Faction fac = new Faction(mf);
				factionList.add(fac);
			}
		});
	}
	
	static void loadRegionsFromJson(Map loaddata) {
		var data = loaddata;
		if(!loaddata.isEmpty && loaddata.containsKey("0") && loaddata["0"] is Map) {
			Map subdata = loaddata["0"];
			//print("submap");
			if (subdata.containsKey("subregions")) {
				//print("subregions");
				data = subdata["subregions"];
				
				// if it's got more than subregions
				if (subdata.length > 1) {
					alertbox("Warning!", "Superregion tags detected! Region loading currently doesn't support tags outside the subregions block, so saving this file may lose data compared to what you put in! Use at your own risk!");
				}
			} else if (subdata.containsKey("ident")) {
				//print("ident");
			} else {
				//print("other");
				data = subdata;
			}
		}
		
		//print(data);
		
		data.forEach((String key, dynamic value) {
			if (value is Map) {
				ModuleRegion module = new ModuleRegion();
				module.load(value);
				
				Region region = new Region(module);
				regionList.add(region);
			}
		});
		
		starchart.update();
	}
	
	static void loadShipFromJson(File file, Map data) {
		Ship ship = new Ship(file.name);
		if (!data.containsKey("blocks")) { 
			alertbox("Invalid Ship File", "The loaded file does not contain a blocks section.");
			return; 
		}
		
		for (var bid in data["blocks"].keys) {
			var block = data["blocks"][bid];
			
			int id = -1;
			double x = 0.0;
			double y = 0.0;
			double rot = 0.0;
			Map<String, dynamic> extra = {};
			
			//print(block);
			
			for (var tag in block.keys) {
				var value = block[tag];
				
				if (tag == "blockid") {
					id = (value is String) ? int.parse(value, onError:(e)=>-1) : value;
				} else if (tag == "pos") {
					if (value is Map) {
						if (value.containsKey("0")) {
							
							x = (value["0"] is String) ? double.parse(value["0"], (e)=>0.0) : value["0"];
						}
						if (value.containsKey("1")) {
							y = (value["1"] is String) ? double.parse(value["1"], (e)=>0.0) : value["1"];
						}
					}
				} else if (tag == "rotation") {
					rot = (value is String) ? double.parse(value, (e)=>0.0) : value;
				} else {
					extra[tag] = value;
				}
			}
			
			ShipBlock sb = new ShipBlock(id, x,y, rot, extra);
			ship.addBlock(sb);
		}
		
		ship.createElement();
	}
}

// save writer

class SaveWriter {
	static void header(StringBuffer buffer) {
		buffer.writeln("-- This file was generated by the Reassembly Web Development Kit (RWDK)");
		buffer.writeln("-- RWDK is an independent project and in no way affiliated with Anisoptera Games.");
		buffer.writeln("-- RWDK was written by TTFTCUTS");
		buffer.writeln("");
	}
	
	static void saveBlocksFile() {
		saveListFile(componentList, "blocks");
	}
	
	static void saveFactionsFile() {
		saveListFile(factionList, "factions");
	}
	
	static void saveListFile(PartList list, String name) {
		StringBuffer buffer = new StringBuffer();
		header(buffer);
		buffer.writeln("{");
		
		for (IPartListable c in list.order) {
			c.save(buffer, 1);
			buffer.writeln("");
		}
		
		buffer.writeln("}");
		
		String content = buffer.toString();
		
		Element a = new AnchorElement()
			..href = "data:text/plain;charset=utf-8,${Uri.encodeComponent(content)}"
			..download = "$name.lua";
		
		document.body.append(a);	
		
		a.click();
		
		a.remove();
	}
	
	static void saveRegionsFile() {
		StringBuffer buffer = new StringBuffer();
		header(buffer);
		
		bool sub = false;
		if (regionList.order.length > 1) {
			sub = true;
		}
		
		if (sub) {
			buffer.writeln("{");
			buffer.writeln("	subregions={");
		}
		
		for (IPartListable c in regionList.order) {
			c.save(buffer, sub ? 2 : 0);
			buffer.writeln("");
		}
		
		if (sub) {
			buffer.writeln("	}");
			buffer.writeln("}");
		}
		
		String content = buffer.toString();
		
		Element a = new AnchorElement()
			..href = "data:text/plain;charset=utf-8,${Uri.encodeComponent(content)}"
			..download = "regions.lua";
		
		document.body.append(a);	
		
		a.click();
		
		a.remove();
	}
	
	static void saveShip(Ship ship) {
		StringBuffer buffer = new StringBuffer();
		header(buffer);
        buffer.writeln("{");
        buffer.writeln("	blocks={");
        
        for (ShipBlock block in ship.blocks) {
        	String def = "{${block.id}";
        	
        	if (block.x != 0.0 || block.y != 0.0) {
        		def += ", {${block.x}, ${block.y}}";
        	}
        	
        	if (block.rot != 0.0) {
        		def += ", ${block.rot}";
        	}
        	
        	if (!block.tags.isEmpty) {
        		for (String key in block.tags.keys) {
        			var val = block.tags[key];
        			String str;
        			if (val is Map) {
        				str = val.toString().replaceAll(":","=");
        			} else {
        				str = val.toString();
        			}
        			
        			def +=", $key=$str";
        		}
        	}
        	
        	def += "},";
        	saveWrite(buffer, def, 3);
        }
        
        buffer.writeln("	}");
        buffer.writeln("}");
        
        String content = buffer.toString();
        
        String filename = "${ship.faction}_${ship.name.replaceAll(" ", "_")}.lua";
        		
		Element a = new AnchorElement()
			..href = "data:text/plain;charset=utf-8,${Uri.encodeComponent(content)}"
			..download = filename;
		
		document.body.append(a);	
		
		a.click();
		
		a.remove();
		
		ship.dirty = false;
		ship.update();
	}
	
}