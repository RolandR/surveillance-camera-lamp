

function main(){
	var baseplateDepth = 6;
	var hingeRadius = 25/2;
	var hingeWidth = 21;
	var hingeMargin = 1;
	
	/*return union(
		buildBaseplate()
		,buildRoundPlate()
			.rotateY(180)
			.translate([0, 0, 2*(hingeRadius+hingeMargin+baseplateDepth)])
	);*/
	
	return buildBaseplate();
}

function buildRoundPlate(){
	var roundPlateRadius = 18;
	var baseplateDepth = 6;
	
	var fnFactor = 1;
	
	var baseplate = cylinder({r: roundPlateRadius, h: baseplateDepth, fn: fnFactor*60});
	
	// add holes for sunk screws
	
	// height of the conical head of the screw
	var screwConeHeight = 3;
	
	// outer diameter of the screw height
	var screwOuterDiameter = 10;
	
	// diameter of the screw itself
	var screwInnerDiameter = 5;
	
	var screwHead = cylinder({r1: screwInnerDiameter/2, r2: screwOuterDiameter/2, h: screwConeHeight, fn: fnFactor*30});
	
	screw = union(
		 screwHead.translate([0, 0, baseplateDepth - screwConeHeight])
		,cylinder({r: screwInnerDiameter/2, h: baseplateDepth, fn: fnFactor*30})
	);
	
	// margin of screws from edge of base plate
	var screwMargin = screwOuterDiameter/2 + 2;
	
	baseplate = difference(
		 baseplate
		,screw
	);
	
	var hingeRadius = 25/2;
	var hingeWidth = 21;
	var hingeMargin = 1;
	
	var hinge = cylinder({r: hingeRadius, h: hingeWidth, fn: fnFactor*60})
		.rotateX(90)
		.center([true, true, true])
		.translate([0, 0, hingeRadius+hingeMargin+baseplateDepth]);
		
	var hingeBase = cube({size: [hingeRadius*2, hingeWidth, hingeRadius+hingeMargin], center: [true, true, false]})
		.translate([0, 0, baseplateDepth]);
		
	hinge = union(
		 hinge
		,hingeBase
	)
	
	var nut = cylinder({r: 9.2/2, h: 3.5, fn: 6});
	
	var hingeScrew = union(
		 screwHead.translate([0, 0, hingeWidth - screwConeHeight])
		,cylinder({r: screwInnerDiameter/2, h: hingeWidth, fn: fnFactor*30})
		,nut
	);
	
	hingeScrew = hingeScrew.rotateX(90)
		.center([true, true, true])
		.translate([0, 0, hingeRadius+hingeMargin+baseplateDepth]);
		
	hinge = difference(
		hinge
		,hingeScrew
	);
	
	var hingeInsideWidth = 10;
	var hingeInsideMargin = 0.3;
	
	var hingeInsideCutout = cube({size: [2*hingeRadius, hingeInsideWidth, 2*hingeRadius+hingeMargin], center: [true, true, false]})
		.translate([0, 0, baseplateDepth]);
	
	hinge = difference(
		hinge
		,hingeInsideCutout
	);
			
	baseplate = union(
		 baseplate
		,hinge
	);
	
	return baseplate;
}



function buildBaseplate(){
	var baseplateWidth = 50;
	var baseplateLength = 60;
	var baseplateDepth = 6;
	
	var fnFactor = 1;
	
	var baseplate = cube({size: [baseplateLength, baseplateWidth, baseplateDepth], center: [true, true, false]});
	
	// add holes for sunk screws
	
	// height of the conical head of the screw
	var screwConeHeight = 3;
	
	// outer diameter of the screw height
	var screwOuterDiameter = 10;
	
	// diameter of the screw itself
	var screwInnerDiameter = 5;
	
	var screwHead = cylinder({r1: screwInnerDiameter/2, r2: screwOuterDiameter/2, h: screwConeHeight, fn: fnFactor*30});
	
	screw = union(
		 screwHead.translate([0, 0, baseplateDepth - screwConeHeight])
		,cylinder({r: screwInnerDiameter/2, h: baseplateDepth, fn: fnFactor*30})
	);
	
	// margin of screws from edge of base plate
	var screwMargin = screwOuterDiameter/2 + 2;
	
	baseplate = difference(
		 baseplate
		,screw.translate([baseplateLength/2-screwMargin, baseplateWidth/2-screwMargin, 0])
		,screw.translate([baseplateLength/2-screwMargin, -baseplateWidth/2+screwMargin, 0])
		,screw.translate([-baseplateLength/2+screwMargin, baseplateWidth/2-screwMargin, 0])
		,screw.translate([-baseplateLength/2+screwMargin, -baseplateWidth/2+screwMargin, 0])
	);
	
	// cut grooves into bottom of baseplate because the box has ridges there
	
	var baseplateGroove = cube({size: [2.5, baseplateWidth, 3.5], center: [true, true, false]});
	
	var centerHole = cylinder({r: 2, h: 4, fn: fnFactor*20})
		
	baseplate = difference(
		 baseplate
		,baseplateGroove
		,baseplateGroove.translate([17, 0, 0])
		,baseplateGroove.translate([-17, 0, 0])
		,centerHole
	)
	
	var hingeRadius = 25/2;
	var hingeWidth = 21;
	var hingeMargin = 1;
	
	var hinge = cylinder({r: hingeRadius, h: hingeWidth, fn: fnFactor*60})
		.rotateX(90)
		.center([true, true, true])
		.translate([0, 0, hingeRadius+hingeMargin+baseplateDepth]);
		
	var hingeBase = cube({size: [hingeRadius*2, hingeWidth, hingeRadius+hingeMargin], center: [true, true, false]})
		.translate([0, 0, baseplateDepth]);
		
	hinge = union(
		 hinge
		,hingeBase
	)
	
	var nut = cylinder({r: 9.2/2, h: 3.5, fn: 6});
	
	var hingeScrew = union(
		 screwHead.translate([0, 0, hingeWidth - screwConeHeight])
		,cylinder({r: screwInnerDiameter/2, h: hingeWidth, fn: fnFactor*30})
		,nut
	);
	
	hingeScrew = hingeScrew.rotateX(90)
		.center([true, true, true])
		.translate([0, 0, hingeRadius+hingeMargin+baseplateDepth]);
		
	hinge = difference(
		hinge
		,hingeScrew
	);
	
	var hingeInsideWidth = 10;
	var hingeInsideMargin = 0.3;
	
	var hingeInsideIntersect = cube({size: [2*hingeRadius, hingeInsideWidth - 2*hingeInsideMargin, 2*hingeRadius+hingeMargin], center: [true, true, false]})
		.translate([0, 0, baseplateDepth]);
	
	hinge = intersection(
		hinge
		,hingeInsideIntersect
	);
			
	baseplate = union(
		 baseplate
		,hinge
	);
	
	return baseplate;
}