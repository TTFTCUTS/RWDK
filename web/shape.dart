part of RWDK;

class BlockShape {
	String name;
	int maxScale = 10;
	bool radial = false; // true for normal-aligned missiles, false for align forward

	static const int engineMaxScale = 20;

	List<List<Vertex>> vertices;
	List<List<Hardpoint>> hardpoints;
	List<Vertex> centroids;
	List<Vertex> overlays;
	List<double> areas;
	List<Map<HardpointType, int>> hardpointCounts;
	List<Set<HardpointType>> hardpointTypes;
	List<double> symbolscales;
	
	BlockShape(String this.name, {this.maxScale : 10, this.radial : false}) {
		this.maxScale = min(engineMaxScale, this.maxScale);
		this.maxScale = min(engineMaxScale, this.maxScale);

		this.vertices = new List<List<Vertex>>(engineMaxScale);
		this.hardpoints = new List<List<Hardpoint>>(engineMaxScale);
		this.centroids = new List<Vertex>(engineMaxScale);
		this.overlays = new List<Vertex>(engineMaxScale);
		this.areas = new List<double>(engineMaxScale);
		this.hardpointCounts = new List<Map<HardpointType, int>>(engineMaxScale);
		this.hardpointTypes = new List<Set<HardpointType>>(engineMaxScale);
		this.symbolscales = new List<double>(engineMaxScale);
		
		for (int scale = 0; scale < maxScale; scale++) {
			this.vertices[scale] = new List<Vertex>();
            this.hardpoints[scale] = new List<Hardpoint>();
			/*this.vertices.add(new List<Vertex>());
			this.hardpoints.add(new List<Hardpoint>());
			this.centroids.add(null);
    		this.overlays.add(null);
    		this.areas.add(0.0);
    		this.hardpointCounts.add(null);
    		this.hardpointTypes.add(null);
    		this.symbolscales.add(0.0);*/
		}
	}
	
	void processVertexFunction(void vertexMethod(BlockShape shape, int scale)) {
		for (int scale = 1; scale <= maxScale; scale++) {
			vertexMethod(this, scale);
		}
	}
	
	void addVertex(int scale, num x, num y) {
		this.vertices[scale-1].add(new Vertex(x,y));
	}
	
	void addHardpoint(int scale, HardpointType type, num x, num y, [num normx=1.0, num normy=0.0]) {
		this.hardpoints[scale-1].add(new Hardpoint(type,x,y,normx,normy)..id = this.hardpoints[scale-1].length);
	}
	
	void setCentroid(int scale, num x, num y) {
		this.overlays[scale-1] = new Vertex(x,y);
	}
	
	void setSymbolScale(int scale, num symsize) {
		this.symbolscales[scale-1] = symsize.toDouble();
	}
	
	void computeShapeInfo() {
		for (int scale = 0; scale < maxScale; scale++) {
			if (overlays[scale] == null) {
				overlays[scale] = new Vertex(0.0,0.0);
			}
			if (symbolscales[scale] == null) {
				symbolscales[scale] = scale+1.0;
			}
			
			Map<HardpointType, int> hpc = new Map<HardpointType, int>();
			Set<HardpointType> hpt = new Set<HardpointType>();
    		for (Hardpoint p in this.hardpoints[scale]) {
    			HardpointType t = p.type;
    			hpt.add(t);
    			if (t.hardpointUI != null) {
    				t = t.hardpointUI;
    			}
    			/*if (hardpointUI.containsKey(t)) {
    				t = hardpointUI[t];
    			}*/
    			if (!hpc.containsKey(t)) {
    				hpc[t] = 0;
    			} 
    			hpc[t]++;
    		}
    		this.hardpointCounts[scale] = hpc;
    		this.hardpointTypes[scale] = hpt;
    		
    		Vertex centroid = new Vertex(0,0);
    		
    		double area = 0.0;
    		for (int i=1; i<=this.vertices[scale].length; i++) {
    			Vertex v0 = this.vertices[scale][i-1];
    			Vertex v1 = this.vertices[scale][i%this.vertices[scale].length];
    			double a = (v0.x * v1.y) - (v0.y * v1.x);
    			
    			centroid.x += (v0.x + v1.x) * a;
    			centroid.y += (v0.y + v1.y) * a; 
    			area += a;
    		}
    		area *= 0.5;
    		centroid.x /= 6 * area;
    		centroid.y /= 6 * area;
    		this.areas[scale] = area.abs();
    		this.centroids[scale] = centroid;
		}
		
		this.recentreVerticesByOverlay();
	}
	
	void recentreVertices() {
		for (int scale = 0; scale < maxScale; scale++) {
			Vertex c = centroids[scale];
			
			for (Vertex v in vertices[scale]) {
				v.x -= c.x;
				v.y -= c.y;
			}
			
			for (Hardpoint h in hardpoints[scale]) {
				h.x -= c.x;
				h.y -= c.y;
			}
			
			this.overlays[scale].x -= c.x;
			this.overlays[scale].y -= c.y;
			
			c.x = 0.0;
			c.y = 0.0;
		}
	}
	
	void recentreVerticesByOverlay() {
		for (int scale = 0; scale < maxScale; scale++) {
			Vertex c = overlays[scale];
			
			for (Vertex v in vertices[scale]) {
				v.x -= c.x;
				v.y -= c.y;
			}
			
			for (Hardpoint h in hardpoints[scale]) {
				h.x -= c.x;
				h.y -= c.y;
			}
			
			this.centroids[scale].x -= c.x;
			this.centroids[scale].y -= c.y;
			
			c.x = 0.0;
			c.y = 0.0;
		}
	}
	
	void rotate(double angle, [List<int> scales]) {
		Rotate r = new Rotate(angle);
		
		for (int scale = 0; scale < maxScale; scale++) {
			if (scales != null && !scales.contains(scale)) { continue; }
			
			Vertex c = centroids[scale];
			
			for (Vertex v in vertices[scale]) {
				double x = r.x(v.x, v.y);
				double y = r.y(v.x, v.y);
				
				v.x = x;
				v.y = y;
			}
			
			for (Hardpoint h in hardpoints[scale]) {
				double x = r.x(h.x, h.y);
                double y = r.y(h.x, h.y);
				
				h.x = x;
				h.y = y;
				
				x = r.x(h.normal.x, h.normal.y);
                y = r.y(h.normal.x, h.normal.y);
                
                h.normal.x = x;
                h.normal.y = y;
			}
			
			Vertex ov = this.overlays[scale];
			double x = r.x(ov.x, ov.y);
            double y = r.y(ov.x, ov.y);
			
			ov.x = x;
			ov.y = y;
		}
	}
}

class Vertex {
	double x;
	double y;
	
	Vertex(num x, num y) {
		this.x = x.toDouble();
		this.y = y.toDouble();
	}
	
	Vertex copy() {
		return new Vertex(this.x, this.y);
	}
}

class Hardpoint extends Vertex{
	HardpointType type;
	Vertex normal;
	int id = 0;
	
	Hardpoint(HardpointType this.type, num x, num y, [num normx = 1.0, num normy = 0.0]) : super(x,y) {
		double len = sqrt(normx*normx + normy*normy);
		
		this.normal = new Vertex(normx/len, normy/len);
	}
	
	Hardpoint copy() {
		return new Hardpoint(this.type, this.x, this.y, this.normal.x, this.normal.y);
	}
}

int sortHardpoints(Hardpoint hp1, Hardpoint hp2) {
	//return hardpointPriority[hp2.type].compareTo(hardpointPriority[hp1.type]);
	return hp2.type.priority.compareTo(hp1.type.priority);
}


class HardpointType {
	static const HardpointType CONNECTOR = const HardpointType("NORMAL", 2, "Connector", "link", "rgba(255,255,255,0.15)", "rgba(255,255,255,0.9)");
	static const HardpointType LAUNCHER = const HardpointType("LAUNCHER", 0, "Launcher", "log-out", "rgba(255,255,0,0.15)", "rgba(200,30,30,0.9)");
	static const HardpointType THRUSTER = const HardpointType("THRUSTER_IN", 3, "Thruster base", "arrow-right", "rgba(100,100,255,0.15)", "rgba(80,80,200,0.9)");
	static const HardpointType THRUSTER_HEAD = const HardpointType("THRUSTER_OUT", 4, "Thruster head", "share-alt", "rgba(255,255,0,0.15)", "rgba(150,150,255,0.9)");
	static const HardpointType UPGRADE = const HardpointType("WEAPON_IN", 6, "Cannonboost base", "plus", "rgba(100,100,255,0.15)", "rgba(150,150,30,0.9)");
	static const HardpointType GUN = const HardpointType("WEAPON_OUT", 5, "Boostable cannon", "plus-sign", "rgba(255,255,0,0.15)", "rgba(255,255,0,0.9)");
	static const HardpointType MISSILE = const HardpointType("MISSILE", 8, "Missile base", "plane", "rgba(100,100,255,0.15)", "rgba(120,0,0,0.9)");
	static const HardpointType ROOT = const HardpointType("ROOT", 7, "Root", "tree-conifer", "rgba(255,255,0,0.15)", "rgba(30,255,30,0.9)");
	//static const HardpointType LAUNCHER_LEFT = const HardpointType("", 1, "Launcher left","", "","", LAUNCHER);
	//static const HardpointType LAUNCHER_RIGHT = const HardpointType("", 1, "Launcher right","", "","", LAUNCHER);
	//static const HardpointType MISSILE_LEFT = const HardpointType("", 9, "Missile left","", "","", MISSILE);
	//static const HardpointType MISSILE_RIGHT = const HardpointType("", 9, "Missile right","", "","", MISSILE);
	
	static Map<String, HardpointType> saveMap = {
		"NORMAL" : CONNECTOR,
		"LAUNCHER" : LAUNCHER,
		"THRUSTER_IN" : THRUSTER,
		"THRUSTER_OUT" : THRUSTER_HEAD,
		"WEAPON_IN" : UPGRADE,
		"WEAPON_OUT" : GUN,
		"MISSILE" : MISSILE,
		"ROOT" : ROOT
	};
	
	final int priority;
	final String colour;
	final String colourBold;
	final String name;
	final String icon;
	final String savename;
	final HardpointType hardpointUI;
	
	const HardpointType(String this.savename, int this.priority, String this.name, String this.icon, String this.colour, String this.colourBold, [HardpointType this.hardpointUI = null]);
}

/*enum HardpointType {
	CONNECTOR,
	LAUNCHER,
	THRUSTER,
	THRUSTER_HEAD,
	UPGRADE,
	GUN,
	MISSILE,
	ROOT,
	LAUNCHER_LEFT,
	LAUNCHER_RIGHT,
	MISSILE_LEFT,
	MISSILE_RIGHT
}

Map<HardpointType, int> hardpointPriority = {
	HardpointType.LAUNCHER : 0,
	HardpointType.LAUNCHER_LEFT : 1,
	HardpointType.LAUNCHER_RIGHT : 1,
	HardpointType.CONNECTOR : 2,
	HardpointType.THRUSTER : 3,
	HardpointType.THRUSTER_HEAD : 4,
	HardpointType.GUN : 5,
	HardpointType.UPGRADE : 6,
	HardpointType.ROOT : 7,
	HardpointType.MISSILE : 8,
	HardpointType.MISSILE_LEFT : 9,
	HardpointType.MISSILE_RIGHT : 9
};

Map<HardpointType, HardpointType> hardpointUI = {
	HardpointType.LAUNCHER_LEFT : HardpointType.LAUNCHER,
	HardpointType.LAUNCHER_RIGHT : HardpointType.LAUNCHER,
	HardpointType.MISSILE_LEFT : HardpointType.MISSILE,
	HardpointType.MISSILE_RIGHT : HardpointType.MISSILE
};

Map<HardpointType, String> hardpointColours = {
	HardpointType.CONNECTOR : "rgba(255,255,255,0.15)",
	HardpointType.LAUNCHER : "rgba(255,255,0,0.15)",
	HardpointType.THRUSTER : "rgba(100,100,255,0.15)",
	HardpointType.THRUSTER_HEAD : "rgba(255,255,0,0.15)",
	HardpointType.UPGRADE : "rgba(100,100,255,0.15)",
	HardpointType.GUN : "rgba(255,255,0,0.15)",
	HardpointType.MISSILE : "rgba(100,100,255,0.15)",
	HardpointType.ROOT : "rgba(255,255,0,0.15)"
};

Map<HardpointType, String> hardpointColoursBold = {
	HardpointType.CONNECTOR : "rgba(255,255,255,0.9)",
	HardpointType.LAUNCHER : "rgba(200,30,30,0.9)",
	HardpointType.THRUSTER : "rgba(80,80,200,0.9)",
	HardpointType.THRUSTER_HEAD : "rgba(150,150,255,0.9)",
	HardpointType.UPGRADE : "rgba(150,150,30,0.9)",
	HardpointType.GUN : "rgba(255,255,0,0.9)",
	HardpointType.MISSILE : "rgba(120,0,0,0.9)",
	HardpointType.ROOT : "rgba(30,255,30,0.9)"
};

Map<HardpointType, String> hardpointNames = {
	HardpointType.CONNECTOR : "Connector",
	HardpointType.LAUNCHER : "Launcher",
	HardpointType.THRUSTER : "Thruster base",
	HardpointType.THRUSTER_HEAD : "Thruster head",
	HardpointType.UPGRADE : "Cannonboost base",
	HardpointType.GUN : "Boostable cannon",
	HardpointType.MISSILE : "Missile base",
	HardpointType.ROOT : "Root"
};

Map<HardpointType, String> hardpointIcons = {
	HardpointType.CONNECTOR : "link",
	HardpointType.LAUNCHER : "log-out",
	HardpointType.THRUSTER : "arrow-right",
	HardpointType.THRUSTER_HEAD : "share-alt",
	HardpointType.UPGRADE : "plus",
	HardpointType.GUN : "plus-sign",
	HardpointType.MISSILE : "plane",
	HardpointType.ROOT : "tree-conifer"
};*/

class ShapeList {
	static Map<String, BlockShape> namemap = new Map<String,BlockShape>();
	
	static final BlockShape MISSING = new BlockShape("MISSING", maxScale:BlockShape.engineMaxScale)..processVertexFunction((shape, scale) => rect(shape,scale,1,1, hptop:null, hpbot:null, hpright:null, hpleft:null, singlepoints:true))..computeShapeInfo();
	
	static final BlockShape SQUARE = new BlockShape("SQUARE")..processVertexFunction((shape, scale) => ngon(shape,scale,4))..computeShapeInfo();
	static final BlockShape OCTAGON = new BlockShape("OCTAGON")..processVertexFunction((shape, scale) => ngon(shape,scale,8, true))..computeShapeInfo();
	
	static final BlockShape THRUSTER = new BlockShape("THRUSTER")..processVertexFunction((BlockShape shape, int scale) {
		double w = (1/(1+sqrt(2))) * scale;
		double h = 0.55 * scale * 0.5;
		
		shape.setSymbolScale(scale, h*2);
		
		shape.addVertex(scale, -h, -w);
		shape.addVertex(scale, -h, w);
		shape.addVertex(scale, h, w*0.5);
		shape.addVertex(scale, h, -w*0.5);
		
		shape.addHardpoint(scale, HardpointType.THRUSTER, h, 0);
		shape.addHardpoint(scale, HardpointType.THRUSTER_HEAD, -h, 0, -1.0, 0.0);
	})..computeShapeInfo();
	
	static final BlockShape CANNON = new BlockShape("CANNON")..processVertexFunction((BlockShape shape, int scale) {
		double w = scale*0.25;
		double g = w*0.5;
		
		if (scale % 2 == 1 && scale != 1) {
			w = (scale+1)*0.25;
		}
		
		shape.setCentroid(scale, -scale*0.5, 0);
        shape.setSymbolScale(scale, scale*0.5);
		
		shape.addVertex(scale, -scale, -w);
		shape.addVertex(scale, -scale, w);
		shape.addVertex(scale, 0, w);
		shape.addVertex(scale, 0, g);
		shape.addVertex(scale, scale, g);
		shape.addVertex(scale, scale, -g);
		shape.addVertex(scale, 0, -g);
		shape.addVertex(scale, 0, -w);
		
		shape.addHardpoint(scale, HardpointType.GUN, scale, 0);
		
		hpLine(shape, scale, -scale, w, -scale, -w);
		hpLine(shape, scale, -scale, -w, 0, -w);
		hpLine(shape, scale, 0, w, -scale, w);
	})..computeShapeInfo();
	
	static final BlockShape MISSILE = new BlockShape("MISSILE")..processVertexFunction((shape, scale) => missile(shape, scale, 0.25, 44.0))..computeShapeInfo();
	
	static final BlockShape RECT = new BlockShape("RECT", maxScale:5)..processVertexFunction((BlockShape shape, int scale) {
		switch(scale) {
			case 1:
				rect(shape, scale, 1, 1 - (1/sqrt(2)), noscale:true);
				break;
			case 2:
				rect(shape, scale, 1, 0.5, noscale:true);
				break;
			case 3:
				rect(shape, scale, 1, 1/sqrt(2), noscale:true);
				break;
			case 4:
				rect(shape, scale, 2, 2 - (2/sqrt(2)), noscale:true);
				break;
			case 5: 
				rect(shape, scale, 2, 2/sqrt(2), noscale:true);
				break;
		}
	})..computeShapeInfo();
	
	static final BlockShape HEXAGON = new BlockShape("HEXAGON")..processVertexFunction((shape, scale) => ngon(shape,scale,6))..computeShapeInfo();
	static final BlockShape TRI = new BlockShape("TRI")..processVertexFunction((shape, scale) => ngon(shape,scale,3))..computeShapeInfo();
	
	static final BlockShape COMMAND = new BlockShape("COMMAND")..processVertexFunction((BlockShape shape, int scale) {
		double s = scale*0.5;
		double r = (1/(1+sqrt(2)))*0.5*scale;
		double c = sqrt(2)*scale;
		
		shape.addVertex(scale, -s, -s);
		shape.addVertex(scale, -s, s);
		shape.addVertex(scale, r, s);
		shape.addVertex(scale, s, r);
		shape.addVertex(scale, s, -r);
		shape.addVertex(scale, r, -s);
		
		hpLine(shape, scale, -s,s, -s, -s);
		hpLine(shape, scale, -s,-s, s, -s);
		hpLine(shape, scale, s,-s, s, s);
		hpLine(shape, scale, s,s, -s, s);
		
		List<Hardpoint> cull = [];
		for (Hardpoint h in shape.hardpoints[scale-1]) {
			if (h.y == -s || h.y == s) {
				if (h.x > r) {
					cull.add(h);
				}
			}
			
			if (h.x == s && (h.y > r || h.y < -r)) {
				cull.add(h);
			}
		}
		
		for (Hardpoint h in cull) {
			shape.hardpoints[scale-1].remove(h);
		}
		
		hpLine(shape, scale, r,-s, s, -r);
		hpLine(shape, scale, s, r, r, s);
	})..computeShapeInfo();
	
	static final BlockShape COMMAND_MISSILE = new BlockShape("COMMAND_MISSILE")..processVertexFunction((BlockShape shape, int scale) {
		double s = scale*0.5;
		double r = (1/(1+sqrt(2)))*0.5*scale;
		double c = sqrt(2)*scale;
		
		shape.addVertex(scale, -s, -s);
		shape.addVertex(scale, -s, s);
		shape.addVertex(scale, r, s);
		shape.addVertex(scale, s, r);
		shape.addVertex(scale, s, -r);
		shape.addVertex(scale, r, -s);
		
		shape.addHardpoint(scale, HardpointType.MISSILE, -s, 0, -1.0, 0.0);
		//shape.addHardpoint(scale, HardpointType.MISSILE_RIGHT, 0, -s, 0.0, -1.0);
		//shape.addHardpoint(scale, HardpointType.MISSILE_LEFT, 0, s, 0.0, -1.0);
		shape.addHardpoint(scale, HardpointType.MISSILE, 0, -s, 0.0, -1.0);
        shape.addHardpoint(scale, HardpointType.MISSILE, 0, s, 0.0, -1.0);
	})..computeShapeInfo();

	static final BlockShape SENSOR = new BlockShape("SENSOR")..processVertexFunction((BlockShape shape, int scale) {
		double w = scale*0.5;
		double h = scale*(1/(1 + sqrt(2)))*0.5;
		
		shape.setSymbolScale(scale, 0.5*scale);
		shape.setCentroid(scale, 0,0);//-0.25*scale, 0);
		
		shape.addVertex(scale, -w, -h);
		shape.addVertex(scale, -w, h);
		shape.addVertex(scale, w, w);
		shape.addVertex(scale, 0, 0);
		shape.addVertex(scale, w, -w);
		
		hpLine(shape, scale, -w,h, -w,-h);
	})..computeShapeInfo();
	
	static final BlockShape ADAPTER = new BlockShape("ADAPTER")..processVertexFunction((BlockShape shape, int scale) {
		shape.addVertex(scale, -0.25, -(scale+1)*0.5);
		shape.addVertex(scale, -0.25, (scale+1)*0.5);
		shape.addVertex(scale, 0.25, scale*0.5);
		shape.addVertex(scale, 0.25, -scale*0.5);
		
		shape.setSymbolScale(scale, 0.5);
		
		shape.addHardpoint(scale, HardpointType.CONNECTOR, 0, -(scale*0.5+0.25), 1.0, -1.0);
		shape.addHardpoint(scale, HardpointType.CONNECTOR, 0, (scale*0.5+0.25), 1.0, 1.0);
		
		hpLine(shape, scale, -0.25, (scale+1)*0.5, -0.25, -(scale+1)*0.5);
		hpLine(shape, scale, 0.25, -scale*0.5, 0.25, scale*0.5);
	})..computeShapeInfo();
	
	static final BlockShape PENTAGON = new BlockShape("PENTAGON")..processVertexFunction((shape, scale) => ngon(shape,scale,5))..computeShapeInfo();
	static final BlockShape RHOMBUS_72_108 = new BlockShape("RHOMBUS_72_108")..processVertexFunction((shape, scale) => rhombus(shape,scale,108))..computeShapeInfo();
	static final BlockShape RHOMBUS_36_144 = new BlockShape("RHOMBUS_36_144")..processVertexFunction((shape, scale) => rhombus(shape,scale,36))..computeShapeInfo();

	static final BlockShape THRUSTER_PENT = new BlockShape("THRUSTER_PENT")..processVertexFunction((BlockShape shape, int scale) {
		double ang = (18/360)*2*PI;
		double depth = cos(ang)*scale*0.5;
		double offset = sin(ang)*scale*0.5;
		
		shape.setSymbolScale(scale, scale*0.5);
		
		shape.addVertex(scale, depth*0.5, -(scale*0.5));
		shape.addVertex(scale, -depth*0.5, -(scale*0.5 + offset));
		shape.addVertex(scale, -depth*0.5, (scale*0.5 + offset));
		shape.addVertex(scale, depth*0.5, (scale*0.5));
		
		shape.addHardpoint(scale, HardpointType.THRUSTER, depth*0.5, 0);
		shape.addHardpoint(scale, HardpointType.THRUSTER_HEAD, -depth*0.5, 0, -1.0, 0.0);
	})..computeShapeInfo();
	
	static final BlockShape DISH_WEAPON = new BlockShape("DISH_WEAPON", maxScale:4)..processVertexFunction((shape, scale) => dish(shape,scale, HardpointType.UPGRADE, HardpointType.GUN))..computeShapeInfo();
	static final BlockShape DISH_THRUSTER = new BlockShape("DISH_THRUSTER", maxScale:4)..processVertexFunction((shape, scale) => dish(shape,scale, HardpointType.THRUSTER, HardpointType.THRUSTER_HEAD))..computeShapeInfo();
	
	static final BlockShape RIGHT_TRI = new BlockShape("RIGHT_TRI")..processVertexFunction((BlockShape shape, int scale) {
		num n = scale*0.5;
		shape.addVertex(scale, -n, -n);
		shape.addVertex(scale, -n, n);
		shape.addVertex(scale, n, n);
		
		shape.setCentroid(scale, -n/3, n/3);
		shape.setSymbolScale(scale, scale/2);
		
		hpLine(shape, scale, -n, n, -n, -n);
		hpLine(shape, scale, n, n, -n, n);
		hpLine(shape, scale, -n, -n, n, n);
	})..rotate(-PI*0.75)..rotate(PI*1.25, [0])..computeShapeInfo();
	
	//static final BlockShape RECT_LAUNCHER = new BlockShape("RECT_LAUNCHER",3)..processVertexFunction((shape, scale) => rect(shape,scale,1,0.4, hptop:HardpointType.LAUNCHER_LEFT, hpbot:HardpointType.LAUNCHER_RIGHT, hpright:null, singlepoints:true))..computeShapeInfo();
	static final BlockShape RECT_LAUNCHER = new BlockShape("RECT_LAUNCHER",maxScale:3)..processVertexFunction((shape, scale) => rect(shape,scale,1,0.4, hptop:HardpointType.LAUNCHER, hpbot:HardpointType.LAUNCHER, hpright:null, singlepoints:true))..computeShapeInfo();
	static final BlockShape RECT_CANNON = new BlockShape("RECT_CANNON", maxScale:1)..processVertexFunction((shape, scale) => rect(shape,scale,1,0.5, hpright:HardpointType.GUN, singlepoints:true))..computeShapeInfo();
	static final BlockShape RECT_CANNON_BOOST = new BlockShape("RECT_CANNON_BOOST", maxScale:1)..processVertexFunction((shape, scale) => rect(shape,scale,1,0.25, hptop:null, hpbot:null, hpleft:HardpointType.UPGRADE, hpright:HardpointType.GUN, singlepoints:true))..computeShapeInfo();
	static final BlockShape RECT_LONG = new BlockShape("RECT_LONG")..processVertexFunction((shape, scale) => rect(shape,scale,1/scale,1))..computeShapeInfo();
	static final BlockShape ISOTRI_72 = new BlockShape("ISOTRI_72")..processVertexFunction((shape, scale) => isotri(shape,scale,72))..computeShapeInfo();
	static final BlockShape ISOTRI_36 = new BlockShape("ISOTRI_36")..processVertexFunction((shape, scale) => isotri(shape,scale,36))..computeShapeInfo();
	
	static final BlockShape RIGHT_TRI2L = new BlockShape("RIGHT_TRI2L")..processVertexFunction((BlockShape shape, int scale) {
		num n = scale*0.5;
		num s = scale.toDouble();
		shape.addVertex(scale, n, -s);
		shape.addVertex(scale, -n, s);
		shape.addVertex(scale, n, s);
		
		shape.setCentroid(scale, n/3,s/3);
		shape.setSymbolScale(scale, 2*scale/3);
		
		hpLine(shape, scale, -n, s, n, -s);
		hpLine(shape, scale, n, s, -n, s);
		hpLine(shape, scale, n, -s, n, s);
    })..rotate(-PI*0.25)..computeShapeInfo();
	
	static final BlockShape RIGHT_TRI2R = new BlockShape("RIGHT_TRI2R")..processVertexFunction((BlockShape shape, int scale) {
		num n = scale*0.5;
		num s = scale.toDouble();
		shape.addVertex(scale, -n, -s);
		shape.addVertex(scale, -n, s);
		shape.addVertex(scale, n, s);
		
		shape.setCentroid(scale, -n/3,s/3);
		shape.setSymbolScale(scale, 2*scale/3);
		
		hpLine(shape, scale, -n, s, -n, -s);
		hpLine(shape, scale, n, s, -n, s);
		hpLine(shape, scale, -n, -s, n, s);
    })..rotate(-PI*0.75)..computeShapeInfo();
	
	static final BlockShape SEED_1 = new BlockShape("SEED_1",maxScale:3)..processVertexFunction((shape, scale) => gem(shape,scale, 1,45, true))..computeShapeInfo();
    static final BlockShape SEED_2 = new BlockShape("SEED_2",maxScale:3)..processVertexFunction((shape, scale) => gem(shape,scale, 2,30, true))..computeShapeInfo();
    static final BlockShape SEED_3 = new BlockShape("SEED_3",maxScale:3)..processVertexFunction((shape, scale) => gem(shape,scale, 3,30, true))..computeShapeInfo();
    static final BlockShape SEED_4 = new BlockShape("SEED_4",maxScale:3)..processVertexFunction((shape, scale) => gem(shape,scale, 4,30, true))..computeShapeInfo();
	static final BlockShape RECT_LONG_NARROW = new BlockShape("RECT_LONG_NARROW")..processVertexFunction((shape, scale) => rect(shape,scale,0.45,(1/3)*scale, noscale:true))..computeShapeInfo(); // (9/22) -> 0.45
	static final BlockShape RECT_LAUNCHER1 = new BlockShape("RECT_LAUNCHER1",maxScale:3)..processVertexFunction((shape, scale) => rect(shape,scale,1,0.75, hpright:HardpointType.LAUNCHER, singlepoints:true))..computeShapeInfo();
	static final BlockShape RIGHT_TRI_22_5L = new BlockShape("RIGHT_TRI_22_5L")..processVertexFunction((shape, scale) => righttri(shape, scale, 22.5, false))..rotate(-PI*0.25)..computeShapeInfo();
    static final BlockShape RIGHT_TRI_22_5R = new BlockShape("RIGHT_TRI_22_5R")..processVertexFunction((shape, scale) => righttri(shape, scale, 22.5, true))..rotate(-PI*0.75)..computeShapeInfo();
    static final BlockShape DISH_MISSILE = new BlockShape("DISH_MISSILE", maxScale:4)..processVertexFunction((shape, scale) => dish(shape,scale, null, HardpointType.MISSILE))..computeShapeInfo();
    static final BlockShape RECT_ROOT = new BlockShape("RECT_ROOT", maxScale:3)..processVertexFunction((shape, scale) => rect(shape,scale,0.5/scale,1, hptop:null, hpbot:null, hpright:HardpointType.ROOT, singlepoints:true))..computeShapeInfo();
    static final BlockShape GEM_1 = new BlockShape("GEM_1",maxScale:3)..processVertexFunction((shape, scale) => gem(shape,scale, 1,45))..computeShapeInfo();
    static final BlockShape GEM_2 = new BlockShape("GEM_2",maxScale:3)..processVertexFunction((shape, scale) => gem(shape,scale, 2,30))..computeShapeInfo();
    static final BlockShape GEM_3 = new BlockShape("GEM_3",maxScale:3)..processVertexFunction((shape, scale) => gem(shape,scale, 3,30))..computeShapeInfo();
    static final BlockShape GEM_4 = new BlockShape("GEM_4",maxScale:3)..processVertexFunction((shape, scale) => gem(shape,scale, 4,30))..computeShapeInfo();
	static final BlockShape ISOTRI_25 = new BlockShape("ISOTRI_25")..processVertexFunction((shape, scale) => isotri(shape,scale,25))..computeShapeInfo();
	static final BlockShape ISOTRI_25_MISSILE = new BlockShape("ISOTRI_25_MISSILE")..processVertexFunction((shape, scale) => isotri(shape,scale,25,false,HardpointType.MISSILE, true))..computeShapeInfo();
	static final BlockShape ISOTRI_13 = new BlockShape("ISOTRI_13")..processVertexFunction((shape, scale) => isotri(shape,scale,13))..computeShapeInfo();
	static final BlockShape ISOTRI_13_MISSILE = new BlockShape("ISOTRI_13_MISSILE")..processVertexFunction((shape, scale) => isotri(shape,scale,13,false,HardpointType.MISSILE, true))..computeShapeInfo();
	static final BlockShape ISOTRI_6 = new BlockShape("ISOTRI_6")..processVertexFunction((shape, scale) => isotri(shape,scale,45/7))..computeShapeInfo();
	static final BlockShape HEPTAGON_LAUNCHER = new BlockShape("HEPTAGON_LAUNCHER", radial:true)..processVertexFunction((shape, scale) => ngon(shape,scale,7, true, false, HardpointType.LAUNCHER))..computeShapeInfo();
	static final BlockShape HEPTAGON = new BlockShape("HEPTAGON")..processVertexFunction((shape, scale) => ngon(shape,scale,7, true))..computeShapeInfo();
	static final BlockShape GEM_2_LAUNCHER = new BlockShape("GEM_2_LAUNCHER",maxScale:3, radial:true)..processVertexFunction((shape, scale) => gem(shape,scale, 2,30, false, HardpointType.LAUNCHER))..computeShapeInfo();
    static final BlockShape GEM_3_LAUNCHER = new BlockShape("GEM_3_LAUNCHER",maxScale:3, radial:true)..processVertexFunction((shape, scale) => gem(shape,scale, 3,30, false, HardpointType.LAUNCHER))..computeShapeInfo();
    static final BlockShape GEM_4_LAUNCHER = new BlockShape("GEM_4_LAUNCHER",maxScale:3, radial:true)..processVertexFunction((shape, scale) => gem(shape,scale, 4,30, false, HardpointType.LAUNCHER))..computeShapeInfo();
    static final BlockShape RECT_QUARTER = new BlockShape("RECT_QUARTER")..processVertexFunction((shape, scale) => rect(shape,scale,0.25/scale,0.25))..computeShapeInfo();
	static final BlockShape ISOTRI_3 = new BlockShape("ISOTRI_3")..processVertexFunction((shape, scale) => isotri(shape,scale,3))..computeShapeInfo();
	static final BlockShape ISOTRI_25_WEAPON = new BlockShape("ISOTRI_25_WEAPON")..processVertexFunction((shape, scale) => isotri(shape,scale,25,false,HardpointType.UPGRADE, true))..computeShapeInfo();
	static final BlockShape NONAGON = new BlockShape("NONAGON")..processVertexFunction((shape, scale) => ngon(shape,scale,9, true))..computeShapeInfo();
	static final BlockShape ISOTRI_80 = new BlockShape("ISOTRI_80")..processVertexFunction((shape, scale) => isotri(shape,scale,80))..computeShapeInfo();
	static final BlockShape THRUSTER_RECT = new BlockShape("THRUSTER_RECT")..processVertexFunction((BlockShape shape, int scale) {
		double w = scale * 0.25;
		//double h = scale * 0.5;
		//double o = h*tan((5/360)*2*PI);
		double h = scale * 0.4936;
		double o = scale * 0.0436;
		
		shape.setSymbolScale(scale, h);
		
		shape.addVertex(scale, -w, -h);
		shape.addVertex(scale, -w, h);
		shape.addVertex(scale, w, h-o);
		shape.addVertex(scale, w, -h+o);
		
		shape.addHardpoint(scale, HardpointType.THRUSTER, w, 0);
		shape.addHardpoint(scale, HardpointType.THRUSTER_HEAD, -w, 0, -1.0, 0.0);
	})..computeShapeInfo();
	static final BlockShape SQUARE_HALF = new BlockShape("SQUARE_HALF", maxScale:1)..processVertexFunction((shape, scale) => rect(shape, scale, 0.5, 0.5))..computeShapeInfo();
	static final BlockShape SQUARE_LAUNCHER = new BlockShape("SQUARE_LAUNCHER", radial:true)..processVertexFunction((shape, scale) => ngon(shape,scale,4, false, false, HardpointType.LAUNCHER))..computeShapeInfo();
	static final BlockShape SQUARE_MISSILE = new BlockShape("SQUARE_MISSILE")..processVertexFunction((shape, scale) => ngon(shape,scale,4, false, false, HardpointType.MISSILE))..computeShapeInfo();
	static final BlockShape RIGHT_TRI_30L = new BlockShape("RIGHT_TRI_30L")..processVertexFunction((shape, scale) => righttri(shape, scale, 30, false))..rotate(-PI*0.25)..computeShapeInfo();
	static final BlockShape RIGHT_TRI_30R = new BlockShape("RIGHT_TRI_30R")..processVertexFunction((shape, scale) => righttri(shape, scale, 30, true))..rotate(-PI*0.75)..computeShapeInfo();
	static final BlockShape OCTAGON_1 = new BlockShape("OCTAGON_1")..processVertexFunction((shape, scale) => ngon(shape,scale,8, true, true))..computeShapeInfo();
	static final BlockShape SQUARE_1 = new BlockShape("SQUARE_1")..processVertexFunction((shape, scale) => ngon(shape,scale,4, false, true))..computeShapeInfo();

	static final BlockShape CANNON2 = new BlockShape("CANNON2")..processVertexFunction((BlockShape shape, int scale) {
		double w = scale*0.25;
		double g = w*0.25;
		
		shape.setCentroid(scale, -scale*0.5, 0);
		shape.setSymbolScale(scale, scale*0.5);
		
		shape.addVertex(scale, -scale, -w);
		shape.addVertex(scale, -scale, w);
		shape.addVertex(scale, scale, w);
		shape.addVertex(scale, scale, g);
		shape.addVertex(scale, 0, g);
		shape.addVertex(scale, 0, -g);
		shape.addVertex(scale, scale, -g);
		shape.addVertex(scale, scale, -w);
		
		shape.addHardpoint(scale, HardpointType.GUN, 0, 0);
		
		hpLine(shape, scale, -scale, w, -scale, -w);
		hpLine(shape, scale, -scale, -w, scale, -w);
		hpLine(shape, scale, scale, w, -scale, w);
	})..computeShapeInfo();
	
	static final BlockShape MISSILE_LAUNCHER = new BlockShape("MISSILE_LAUNCHER")..processVertexFunction((shape, scale) => missile(shape, scale, 0.25, 45.0, launcher:true))..computeShapeInfo();
	static final BlockShape MISSILE_SHORT = new BlockShape("MISSILE_SHORT")..processVertexFunction((shape, scale) => missile(shape, scale, 0.5, 75.75))..computeShapeInfo();
	
	static List<BlockShape> values = [ SQUARE, OCTAGON, THRUSTER, CANNON, MISSILE, RECT, HEXAGON, TRI, COMMAND, COMMAND_MISSILE, SENSOR, 
		ADAPTER, PENTAGON, RHOMBUS_72_108, RHOMBUS_36_144, THRUSTER_PENT, DISH_WEAPON, DISH_THRUSTER, RIGHT_TRI, 
		RECT_LAUNCHER, RECT_CANNON, RECT_CANNON_BOOST, RECT_LONG, ISOTRI_72, ISOTRI_36,	RIGHT_TRI2L, RIGHT_TRI2R,
		RECT_LONG_NARROW, RECT_LAUNCHER1, SEED_1, SEED_2, SEED_3, SEED_4, RIGHT_TRI_22_5L, RIGHT_TRI_22_5R, DISH_MISSILE,
		RECT_ROOT, GEM_1, GEM_2, GEM_3, GEM_4, ISOTRI_25, ISOTRI_25_MISSILE, ISOTRI_13, ISOTRI_13_MISSILE, ISOTRI_6, 
		HEPTAGON_LAUNCHER, HEPTAGON, GEM_2_LAUNCHER, GEM_3_LAUNCHER, GEM_4_LAUNCHER, RECT_QUARTER, ISOTRI_3, 
		ISOTRI_25_WEAPON, NONAGON, ISOTRI_80, THRUSTER_RECT, SQUARE_HALF, SQUARE_LAUNCHER, SQUARE_MISSILE, RIGHT_TRI_30L,
		RIGHT_TRI_30R, OCTAGON_1, SQUARE_1, CANNON2, MISSILE_LAUNCHER, MISSILE_SHORT];
	
	static List<BlockShape> getShapeList() {
		return new List<BlockShape>()..addAll(values)..addAll(customShapeList.order as List<CustomShape>);
	}
	
	static Map<String, BlockShape> getNameMap() {
		Map<String,BlockShape> sm = new Map<String,BlockShape>()..addAll(namemap);
		
		for (CustomShape s in customShapeList.order) {
			sm["${s.id}"] = s;
		}
		
		return sm;
	}
	
	static void initShapes() {
		for (BlockShape shape in ShapeList.values) {
			ShapeList.namemap[shape.name] = shape;
		}
		values.sort((BlockShape s1, BlockShape s2){
			return s1.name.compareTo(s2.name);
		});
	}
	
	static void hpLine(BlockShape shape, int scale, num x1, num y1, num x2, num y2, {int spacing:1, HardpointType hptype:HardpointType.CONNECTOR, bool autospace : true, bool normalflip:false}) {
		num dx = x2-x1;
		num dy = y2-y1;
		double len = (sqrt(dx*dx+dy*dy)*10000).round()/10000;
		int hpcount = max(1,len.floor());
		
		if (autospace) {
			if (hpcount >= 5 && hpcount % 2 == 1) {
				spacing = 2;
				hpcount = (hpcount/spacing).ceil();
			}
		}

		double mx = (x1+x2)*0.5;
		double my = (y1+y2)*0.5;
		double ox = (dx/len) * spacing;
		double oy = (dy/len) * spacing;
		
		double nx = dy / len;
		double ny = -dx / len;
		
		if (normalflip) {
			nx *= -1;
			ny *= -1;
		}
		
		for (int i=0; i<hpcount; i++) {
			shape.addHardpoint(scale, hptype, (mx - ((hpcount-1)*0.5)*ox) + ox*i, (my - ((hpcount-1)*0.5)*oy) + oy*i, nx, ny);
		}
	}
	
	static void rect(BlockShape shape, int scale, num width, num height, {bool noscale : false, HardpointType hptop : HardpointType.CONNECTOR, HardpointType hpbot : HardpointType.CONNECTOR, HardpointType hpleft : HardpointType.CONNECTOR, HardpointType hpright : HardpointType.CONNECTOR, bool singlepoints : false}) {
		int drawscale = noscale ? 1 : scale;
		num left = -width*0.5*drawscale;
		num right = width*0.5*drawscale;
		num top = -height*0.5*drawscale;
		num bot = height*0.5*drawscale;
		
		shape.addVertex(scale, left, top);
		shape.addVertex(scale, left, bot);
		shape.addVertex(scale, right, bot);
		shape.addVertex(scale, right, top);

		shape.setSymbolScale(scale, min(width,height)*drawscale);
		 
		if (hpleft != null) { 
			if (singlepoints) {
				shape.addHardpoint(scale, hpleft, left, 0, -1.0, 0.0);
			} else {
				hpLine(shape, scale, left, bot, left, top, hptype:hpleft);
			}
		}
		if (hpright != null) { 
			if (singlepoints) {
				shape.addHardpoint(scale, hpright, right, 0, 1.0, 0.0);
			} else {
				hpLine(shape, scale, right, top, right, bot, hptype:hpright); 
			}
		}
		if (hptop != null) { 
			if (singlepoints) {
				shape.addHardpoint(scale, hptop, 0, top, 0.0, -1.0);
			} else {
				hpLine(shape, scale, left, top, right, top, hptype:hptop);
			}
		}
		if (hpbot != null) { 
			if (singlepoints) {
				shape.addHardpoint(scale, hpbot, 0, bot, 0.0, 1.0);
			} else {
				hpLine(shape, scale, right, bot, left, bot, hptype:hpbot); 
			}
		}

	}
	
	static void ngon(BlockShape shape, int scale, int sides, [bool halfFirst = false, bool single = false, HardpointType hptype = HardpointType.CONNECTOR]) {
		bool shrink = false;
		int drawscale = scale;
		if (halfFirst) {
			if (scale > 1) {
				drawscale -= 1;
			} else {
				shrink = true;
			}
		}
		double angle = (2*PI) / sides;
		
		//double len = (drawscale*0.5) * tan(angle);
		//double len = drawscale * sin(angle*0.5) * 2;
		double len = ((drawscale*0.5) / sin(angle*0.5));
		
		if (shrink) {
			len = 0.5 / cos(angle*0.5); //0.5;
		}
		
		shape.setSymbolScale(scale, len * cos(angle*0.5) * 2);
		
		for (int i=0; i<sides; i++) {
			double a = angle * (i-0.5) + PI;
			
			double y = len * sin(a);
			double x = len * cos(a);
			
			shape.addVertex(scale, x, y);
		}
		
		List<Vertex> verts = shape.vertices[scale-1];
		for (int i=0; i<verts.length; i++) {
			Vertex v1 = verts[i];
			Vertex v2 = verts[(i+1) % verts.length];
			
			HardpointType h = hptype;
			if (i != sides ~/ 2 && single) {
				continue;
			}
			
			if (h != null) {
				hpLine(shape, scale, v1.x, v1.y, v2.x, v2.y, hptype:h);
			}
		}
	}
	
	static void isotri(BlockShape shape, int scale, num angle, [bool sides = true, HardpointType hptype = HardpointType.CONNECTOR, bool singlepoint = false]) {
		angle = (angle/360)*2*PI;
		
		double height = cos(angle*0.5) * scale;
		double halfbase = sin(angle*0.5) * scale;
		double h3 = height/3;
		double h2 = height*0.5;
		
		shape.setCentroid(scale, 0, -height/6);
		
		shape.addVertex(scale, -h2, -halfbase);
		shape.addVertex(scale, -h2, halfbase);
		shape.addVertex(scale, h2, 0);
		
		shape.setCentroid(scale, -h3*0.5, 0);
		shape.setSymbolScale(scale, (height*0.5 * (0.6 + halfbase*0.5/scale)));
		
		if (singlepoint) {
			shape.addHardpoint(scale, hptype, -h2, 0, -1.0, 0.0);
		} else {
			hpLine(shape, scale, -h2, halfbase, -h2, -halfbase, hptype:hptype);
		}
		
		if (sides) {
			hpLine(shape, scale, -h2, -halfbase, h2, 0);
			hpLine(shape, scale, h2, 0, -h2, halfbase);
		}
	}
	
	static void righttri(BlockShape shape, int scale, num angle, bool right) {
		double w = scale*0.5;
		double a = (angle/360)*2*PI;
		
		double len = scale / tan(a);
		double h = len*0.5;
		
		double p = right ? -w : w;
		
		shape.setCentroid(scale, p/3, h/3);
		shape.setSymbolScale(scale, scale*(w/h));
		
		shape.addVertex(scale, p, -h);
		shape.addVertex(scale, -w, h);
		shape.addVertex(scale, w, h);
		
		hpLine(shape, scale, -w, h, p, -h);
		hpLine(shape, scale, p, -h, w, h);
		hpLine(shape, scale, w, h, -w, h);
	}
	
	static void rhombus(BlockShape shape, int scale, num acute) {
		num reflex = ((180 - acute)/360)*2*PI;
		acute = (acute/360)*2*PI;
		
		double short = sin(acute*0.5) * scale;
		double long = cos(acute*0.5) * scale;
		
		shape.setSymbolScale(scale, min(short,long)*2.0*0.9);
		
		shape.addVertex(scale, -long, 0);
		shape.addVertex(scale, 0, short);
		shape.addVertex(scale, long, 0);
		shape.addVertex(scale, 0, -short);
		
		hpLine(shape,scale, -long, 0, 0, short, normalflip:true);
		hpLine(shape,scale, 0, short, long, 0, normalflip:true);
		hpLine(shape,scale, long, 0, 0, -short, normalflip:true);
		hpLine(shape,scale, 0, -short, -long, 0, normalflip:true);
	}
	
	static void gem(BlockShape shape, int scale, int segments, num angle, [bool seed = false, HardpointType hptype = HardpointType.CONNECTOR]) {
		double ang = (angle/360)*2*PI;
		
		shape.addVertex(scale, -0.5*scale, -0.25*scale);
		shape.addVertex(scale, -0.5*scale, 0.25*scale);
		
		hpLine(shape, scale, -0.5*scale, 0.25*scale, -0.5*scale, -0.25*scale, hptype:seed ? HardpointType.ROOT : HardpointType.CONNECTOR);
		
		double w = min(scale.toDouble(), (scale*0.5 + (sin(ang*segments*0.5)/scale)*2)*0.5*scale);
		shape.setSymbolScale(scale, w);
		
		for(int i=0; i<= segments; i++) {
			double a = segments*0.5*ang - i * ang;
			
			double x = sin(a) * scale;
			double y = cos(a) * scale;
			
			shape.addVertex(scale, y - 0.5*scale, x);
			
			if (i == 0) {
				//hpLine(shape, scale, y - 0.5*scale, x, -0.5*scale, 0.25*scale);
				double ax = (y-scale)*0.5;
                double ay = (x+0.25*scale)*0.5;
				shape.addHardpoint(scale, HardpointType.CONNECTOR, ax, ay, ay, -ax);
			} else if (i == segments) {
				//hpLine(shape, scale,  -0.5*scale, -0.25*scale, y - 0.5*scale, x);
				double ax = (y-scale)*0.5;
                double ay = (x-0.25*scale)*0.5;
				shape.addHardpoint(scale, HardpointType.CONNECTOR, ax, ay, ay, -ax);
			}
			
			if (i != 0) {
				double a2 = segments*0.5*ang - (i-1) * ang;
                			
    			double x2 = sin(a2) * scale;
    			double y2 = cos(a2) * scale;
    			
    			//hpLine(shape, scale, y - 0.5*scale, x, y2 - 0.5*scale, x2, hptype:hptype);
    			double ay = (x+x2)*0.5;
    			double ax = (y+y2)*0.5 - 0.5*scale;
    			shape.addHardpoint(scale, hptype, ax, ay, (x2-x), -(y2-y));
			}
		}
	}
	
	static void dish(BlockShape shape, int scale, HardpointType hpbase, HardpointType hphead) {
		double mult = 1.0;
		double angle = ((scale <= 2 ? 50 : 30)/360)*2*PI;
		double xmult = scale <= 2 ? 1.0 : -1.0;
		double height = scale <= 2 ? 9/28 : 3/4;
		double h = height*0.5;
		
		if (scale == 1) {
			mult = 28/47;
		} else if (scale == 3) {
			mult = 2/3;
		}
		
		shape.setSymbolScale(scale, h*2*mult);
		
		double oy = height / tan(angle);
		
		shape.addVertex(scale, -h*xmult*mult, 0.5*mult);
		shape.addVertex(scale, -h*xmult*mult, -0.5*mult);
		shape.addVertex(scale, h*xmult*mult, -(0.5 - oy*xmult)*mult);
		shape.addVertex(scale, h*xmult*mult, (0.5 - oy*xmult)*mult);
		
		if (hpbase != null) {
			shape.addHardpoint(scale, hpbase, h*mult, 0);
		}
		if (hphead != null) {
			shape.addHardpoint(scale, hphead, -h*mult, 0, -1.0, 0.0);
		}
	}
	
	static void missile(BlockShape shape, int scale, double width, double noseangle, {bool launcher : false, bool sides : true}) {
		double l = scale*0.5;
		double w = scale*width*0.5;
		double inset = (w / tan((noseangle/350)*PI));
		
		shape.setSymbolScale(scale, w*2);
		
		shape.addVertex(scale, -l, -w);
		shape.addVertex(scale, -l, w);
		shape.addVertex(scale, l - inset, w);
		shape.addVertex(scale, l, 0);
		shape.addVertex(scale, l - inset, -w);
		
		shape.addHardpoint(scale, HardpointType.MISSILE, -l, 0, -1.0, 0.0);
		
		if (sides) {
			//HardpointType sidetop = launcher ? HardpointType.LAUNCHER_LEFT : HardpointType.MISSILE_RIGHT;
			//HardpointType sidebot = launcher ? HardpointType.LAUNCHER_RIGHT : HardpointType.MISSILE_LEFT;
			HardpointType sidetop = launcher ? HardpointType.LAUNCHER : HardpointType.MISSILE;
            HardpointType sidebot = launcher ? HardpointType.LAUNCHER : HardpointType.MISSILE;
			shape.addHardpoint(scale, sidetop, -inset*0.5, -w, 0.0, -1.0);
			shape.addHardpoint(scale, sidebot, -inset*0.5, w, 0.0, 1.0);
		}
	}
}