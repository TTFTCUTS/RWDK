part of RWDK;

class TabManager {
	static Map<Element, Element> map = {};
	
	static void addTabDef(String tab, String body) {
		Element te = querySelector("#$tab");
		Element tb = querySelector("#$body");
		map[te] = tb;
		listen(te);
	}
	
	static void deselect() {
		for (Element tab in map.keys) {
			Element body = map[tab];
			tab.classes.remove("tabactive");
			body.classes.add("hidden");
		}
	}
	
	static void select(Element tab) {
		deselect();
		tab.classes.add("tabactive");
		map[tab].classes.remove("hidden");
	}
	
	static void selectName(String tab) {
		select(querySelector("#$tab"));
	}
	
	static void listen(Element element) {
		element.addEventListener("click", (Event e) {TabManager.select(element);});
	}
}