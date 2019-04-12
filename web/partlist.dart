part of RWDK;

abstract class IPartListable {
	Element element;
	PartList partlist;
	int partid;
	
	void createElement();
	
	void select();
	void deselect();
	void destroy();
	void update();
	void save(StringBuffer buffer, [int indent = 0]);
	IPartListable copy();
}

class PartList {
	int listingid = 0;
	Map<int, IPartListable> mapping = {};
	List<IPartListable> order = [];
	IPartListable selected = null;
	
	Element container;
	Element details;
	
	var updatecallback;
	var addcallback;
	
	PartList(String containerid, String detailsid) {
		this.container = querySelector("#$containerid");
		this.details = querySelector("#$detailsid");
	}
	
	void add(IPartListable added, [int pos=-1]) {
		int id = listingid++;
		mapping[id] = added;
		added.partlist = this;
		added.createElement();
		container.append(added.element);
		added.partid = id;
		if (pos == -1) {
			order.add(added);
		} else {
			order.insert(pos, added);
			this.reorder();
		}
		if (this.addcallback != null) {
			this.addcallback(this, added);
		}
		this.update();
	}
	
	void copy(IPartListable copied) {
		IPartListable c = copied.copy();
		if (c == null) { return; }
		int pos = order.indexOf(copied);
		if (c == -1) { 
			pos = order.length-1;
		}
		this.add(c, pos+1);
		c.update();
	}
	
	void shiftLeft(IPartListable shifted) {
		int pos = order.indexOf(shifted);
		if (pos <= 0) {return;}
		
		IPartListable swap = order[pos-1];
		order[pos-1] = shifted;
		order[pos] = swap;
		
		this.reorder();
	}
	
	void shiftRight(IPartListable shifted) {
		int pos = order.indexOf(shifted);
        if (pos == -1 || pos >= order.length-1) {return;}
        
        IPartListable swap = order[pos+1];
		order[pos+1] = shifted;
		order[pos] = swap;
		
		this.reorder();
	}
	
	void select(IPartListable selected) {
		if (this.selected != selected) {
			for (IPartListable part in mapping.values) {
				part.deselect();
			}
			
			selected.select();
			this.selected = selected;
		}
	}
	
	void clear() {
		for (int i=order.length-1; i>=0; i--) {
			this.destroy(this.order[i]);
		}
	}
	
	void destroy(IPartListable destroyed) {
		this.mapping.remove(destroyed.partid);
		this.order.remove(destroyed);
		if (this.selected == destroyed) {
			this.selected = null;
		}
		destroyed.destroy();
		this.update();
	}
	
	void reorder() {
    	List<Node> toSort = new List<Node>();
    	for (Node n in container.childNodes) {
    		if (n.nodeType == 1) {
    			toSort.add(n);
    		}
    	}
    	container.innerHtml = "";
    	
    	for (IPartListable p in order) {
    		container.append(p.element);
    	}
	}
	
	void update() {
		if (this.updatecallback != null) {
			this.updatecallback(this);
		}
	}
	
	void updateList() {
		for (IPartListable p in order) {
    		p.update();
    	}
	}
}