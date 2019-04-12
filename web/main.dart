library RWDK;

import 'dart:math';
import 'dart:html';
import 'dart:convert';
import 'dart:js' as js;

part "partlist.dart";
part "component.dart";
part "faction.dart";
part "region.dart";
part "ship.dart";
part "shape.dart";
part "blockrenderer.dart";
part "starchartrenderer.dart";
part "module.dart";
part "field.dart";
part "enums.dart";
part "parser.dart";
part "tabs.dart";
part "customshape.dart";

part "utils.dart";

void main() {
	RichEnum.initEnums();
	ShapeList.initShapes();
	Faction.initPreviews();

	addLeftClick(querySelector("#blockaddbutton"), (MouseEvent e) {
		Component.create();
	});
	
	addLeftClick(querySelector("#blockloadbutton"), (MouseEvent e) {
		querySelector("#blockloadinput")..style.visibility="visible"..focus()..click()..style.visibility="hidden";
	});
	
	addLeftClick(querySelector("#blocksavebutton"), (MouseEvent e) {
		SaveWriter.saveBlocksFile();
	});
	
	addLeftClick(querySelector("#idbutton"), (MouseEvent e) {
		querySelector("#alertbackground")..style.display="block";
		querySelector("#idreorderbox")..style.display="block";
	});
	
	addLeftClick(querySelector("#idreorderbutton_ok"), (MouseEvent e) {
		idreorder();
		querySelector("#alertbackground")..style.display="none";
        querySelector("#idreorderbox")..style.display="none";
	});
	
	addLeftClick(querySelector("#idreorderbutton_cancel"), (MouseEvent e) {
		querySelector("#alertbackground")..style.display="none";
		querySelector("#idreorderbox")..style.display="none";
	});
	
	addLeftClick(querySelector("#blockclearbutton"), (MouseEvent e) {
		confirmbox("Clear block palette", "Are you sure you want to delete all blocks in the palette? This cannot be undone.", "Delete", "Cancel", () { componentList.clear();});
	});
	
	querySelector("#blockloadinput").addEventListener("change", (Event e) {
		FileUploadInputElement fin = (e.target as FileUploadInputElement);
		File file = fin.files[0];
		
		if (file == null) { return; }
		
		Parser.loadBlocksFile(file);
		
		fin.value = "";
	});
	
	//#######################################################
	
	addLeftClick(querySelector("#shapeaddbutton"), (MouseEvent e) {
		CustomShape.create();
	});
	
	addLeftClick(querySelector("#shapeloadbutton"), (MouseEvent e) {
		querySelector("#shapeloadinput")..style.visibility="visible"..focus()..click()..style.visibility="hidden";
	});
	
	addLeftClick(querySelector("#shapesavebutton"), (MouseEvent e) {
		//SaveWriter.saveShapesFile();
	});
	
	addLeftClick(querySelector("#shapeclearbutton"), (MouseEvent e) {
		confirmbox("Clear shape palette", "Are you sure you want to delete all shapes in the palette? This cannot be undone.", "Delete", "Cancel", () { customShapeList.clear(); });
	});
	
	querySelector("#shapeloadinput").addEventListener("change", (Event e) {
		FileUploadInputElement fin = (e.target as FileUploadInputElement);
		File file = fin.files[0];
		
		if (file == null) { return; }
		
		Parser.loadShapesFile(file);
		
		fin.value = "";
	});
	
	//#######################################################
	
	addLeftClick(querySelector("#factionaddbutton"), (MouseEvent e) {
		Faction.create();
	});
	
	addLeftClick(querySelector("#factionloadbutton"), (MouseEvent e) {
		querySelector("#factionloadinput")..style.visibility="visible"..focus()..click()..style.visibility="hidden";
	});
	
	addLeftClick(querySelector("#factionsavebutton"), (MouseEvent e) {
		SaveWriter.saveFactionsFile();
	});
	
	addLeftClick(querySelector("#factionclearbutton"), (MouseEvent e) {
		confirmbox("Clear faction palette", "Are you sure you want to delete all factions in the palette? This cannot be undone.", "Delete", "Cancel", () { factionList.clear();});
	});
	
	querySelector("#factionloadinput").addEventListener("change", (Event e) {
		FileUploadInputElement fin = (e.target as FileUploadInputElement);
		File file = fin.files[0];
		
		if (file == null) { return; }
		
		Parser.loadFactionsFile(file);
		
		fin.value = "";
	});
	
	//#######################################################
	
	addLeftClick(querySelector("#regionaddbutton"), (MouseEvent e) {
		Region.create();
	});
	
	addLeftClick(querySelector("#regionloadbutton"), (MouseEvent e) {
		querySelector("#regionloadinput")..style.visibility="visible"..focus()..click()..style.visibility="hidden";
	});
	
	addLeftClick(querySelector("#regionsavebutton"), (MouseEvent e) {
		SaveWriter.saveRegionsFile();
	});
	
	addLeftClick(querySelector("#regionclearbutton"), (MouseEvent e) {
		confirmbox("Clear region list", "Are you sure you want to delete all regions in the list? This cannot be undone.", "Delete", "Cancel", () { regionList.clear();});
	});
	
	querySelector("#regionloadinput").addEventListener("change", (Event e) {
		FileUploadInputElement fin = (e.target as FileUploadInputElement);
		File file = fin.files[0];
		
		if (file == null) { return; }
		
		Parser.loadRegionsFile(file);
		
		fin.value = "";
	});
	
	//#######################################################
	
	addLeftClick(querySelector("#shiploadbutton"), (MouseEvent e) {
		querySelector("#shiploadinput")..style.visibility="visible"..focus()..click()..style.visibility="hidden";
	});
	
	addLeftClick(querySelector("#shipclearbutton"), (MouseEvent e) {
		confirmbox("Clear ship list", "Are you sure you want to clear all ships in the list? Any unsaved id changes will be lost.", "Clear", "Cancel", () { Ship.clearList();});
	});
	
	addLeftClick(querySelector("#shiprefreshbutton"), (MouseEvent e) {
		Ship.redrawAll();
	});
	
	querySelector("#shiploadinput").addEventListener("change", (Event e) {
		FileUploadInputElement fin = (e.target as FileUploadInputElement);
		
		for (File file in fin.files) {
			if (file != null) {
				Parser.loadShipFile(file);
			}
		}
		
		fin.value = "";
	});
	
	//#######################################################
	
	addLeftClick(querySelector("#alertbutton"), (MouseEvent e) {
		querySelector("#alertbox")..style.display="none";
		querySelector("#alertbackground")..style.display="none";
		querySelector("#alerttext").text = "";
		querySelector("#alerttitle").text = "";
	});
	
	addLeftClick(querySelector("#confirmbuttonno"), (MouseEvent e) {
		querySelector("#confirmbox")..style.display="none";
		querySelector("#alertbackground")..style.display="none";
		querySelector("#confirmtext").text = "";
		querySelector("#confirmtitle").text = "";
		
		if (confirmboxaction != null) {
			querySelector("#confirmbuttonyes").removeEventListener("click", confirmboxaction);
		}
	});
	
	TabManager.addTabDef("blockstab", "blocks");
	TabManager.addTabDef("shapesstab", "shapes");
	TabManager.addTabDef("factionstab", "factions");
	TabManager.addTabDef("regionstab", "regions");
	TabManager.addTabDef("shipstab", "ships");
	TabManager.selectName("blockstab");
	
	//new Faction()..createElement()..select();
	
	componentList = new PartList("databank", "blocks");
    	/*..addcallback = (PartList list, IPartListable added) {
    		Component c = added as Component;
    		c.update();
    	};*/
	customShapeList = new PartList("shapelist", "shapes")
		..updatecallback = (PartList list) {
			if (componentList.selected != null) {
				((componentList.selected as Component).module.fields["shape"] as FieldShape).needsListUpdate = true;
			}
			componentList.updateList();
		};
	factionList = new PartList("factionlist", "factions");
	regionList = new PartList("regionlist", "regionsbox");
	
	factionList
	..updatecallback = (PartList list) {
		regionList.updateList();
		Ship.updateAll();
	};
	
	starchart = new StarchartRenderer(400);
	querySelector("#regionsbox").append(starchart.canvas);
	starchart.clearToGrid();
}
