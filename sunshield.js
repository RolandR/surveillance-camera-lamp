

function main(){
	
	var wallThickness = 2;
	var width = 130;
	var height = 52;
	var overhang = 50;
	
	var top = cube({size: [overhang, width, wallThickness], center: [false, true, false]});
	
	var side = cube({size: [overhang, wallThickness, height]});
	
	side = side.translate([0, -width/2, 0]);
		
	var sides = union(
		side
		,side.mirroredY()
	);
	
	var shield = union(
		top
		,sides
	);
	
	var flankStartOffset = 10;
	
	var flank = cube({size: [overhang*2, height, wallThickness], center: [false, true, false]})
		.rotateX(-45)
		.rotateY(-10)
		.translate([flankStartOffset, -width/2, 0]);
		
	var flankCutout = cube({size: [overhang*2, height, height], center: [false, true, false]})
		.translate([0, 0, -height])
		.rotateX(-45)
		.rotateY(-10)
		.translate([flankStartOffset, -width/2, 0]);
	
	shield = difference(
		shield
		,flankCutout
		,flankCutout.mirroredY()
	);
		
	shield = union(
		shield
		,flank
		,flank.mirroredY()
	);
	
	shield = intersection(
		shield,
		cube({size: [overhang, width, height], center: [false, true, false]})
	);
	
	var notch = cube({size: [4, width, 7], center: [false, true, false]})
		.translate([0, 0, wallThickness]);
		
	shield = difference(
		shield,
		notch
	);
		
	var cutout = cube({size: [overhang*3, width, height], center: [false, true, false]})
		.rotateY(42)
		.translate([overhang/6, 0, height]);
		
	shield = difference(
		shield
		,cutout
	);
	
	var back = 30;
	
	var backPart = cube({size: [back, width, wallThickness], center: [false, true, false]})
		.translate([-back, 0, 0]);
		
	var backPartCutout = cube({size: [back, width, wallThickness], center: [false, false, false]})
		.rotateZ(90+10)
		.translate([0, width/2, 0]);
		
	backPart = difference(
		backPart
		,backPartCutout
		,backPartCutout.mirroredY()
	);
		
	shield = union(
		shield
		,backPart
	);
	
	var backCutoutWidth = 103;
	var backCutoutRadius = 23;
	var backCutoutOffset = 5;
	
	var backCutout = cube({size: [100, backCutoutWidth-2*backCutoutRadius, wallThickness], center: [false, true, false]})
		.translate([-100, 0, 0]);
	
	var backCutoutCircle = cylinder({r: backCutoutRadius, h: wallThickness})
		.translate([-backCutoutRadius, backCutoutWidth/2-backCutoutRadius, 0]);
	
	var backCutoutWide = cube({size: [100, backCutoutWidth, wallThickness], center: [false, true, false]})
		.translate([-100-backCutoutRadius, 0, 0]);
		
	backCutout = union(
		backCutout,
		backCutoutWide,
		backCutoutCircle,
		backCutoutCircle.mirroredY()
	);
	
	backCutout = backCutout.translate([backCutoutOffset, 0, 0])
	
		
	shield = difference(
		shield
		,backCutout
	);
	
	shield = shield.rotateX(180).translate([0, 0, height*1.2]).setColor(1, 0, 0);
	
	return shield;
	
	
}