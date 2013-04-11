interface NodeWarCommand {
  torque: number;
  thrust: number;
  label?: string;
  log?: string;
}

interface NodeWarConstants {
  MIN_THRUST: number; // 0; the min thrust a ship can apply
  MAX_THRUST: number; // 1000; this value, in newtons, is multiplied by whatever you return in [0..1] in your thrust instructions
  MAX_TORQUE: number; //1000; this value, in newton-meters, is multiplied by whatever you return in [-1..1] in your torque instructions
  INVINCIBILITY: number; //0.25; how many seconds a ship is invincible after birth
  G: number; //1.0; the universal gravitational constant
}

interface NodeWarGameInfo {
  time: number; // the game time, in seconds
  moon_field: number; // the radius of playing field, from center
  center: number[]; // position of the center, i.e. [0,0]
}

interface NodeWarLibVec {
  dotProduct: (v1: number[], v2: number[]) => number;
  len: (v: number[]) => number;
  lenSquared: (v: number[]) => number;
  diff: (v1: number[], v2: number[]) => number[];
  sum:  (v1: number[], v2: number[]) => number[];
  times: (v: number[], n: number) => number[];
  ang: (v: number[]) => number;
  dist: (v1: number[], v2: number[]) => number;
  distSquared: (v1: number[], v2: number[]) => number;
  normalized: (v: number[]) => number[];
  center: (vs: number[][]) => number[];
  toPolar: (v: number[]) => number[];
  fromPolar: (v: number[]) => number[];
}

interface NodeWarLibAng {
  diff: (a1: number, a2: number) => number;
  rescale: (a: number) => number;
  fromDegrees: (a: number) => number;
  toDegrees: (a: number) => number;
}

interface NodeWarLibMath {
  mod: (a: number, b: number) => number;
}

interface NodeWarLibPhysics {
  speedToward: (v: number[], p: number[], dest: number[]) => number;
}

interface NodeWarLibTargeting {
  dir: (ship: NodeWarShip, pos: number[]) => number;
  simpleTarget: (ship: NodeWarShip, pos: number[]) => number;
}

interface NodeWarLib {
  vec: NodeWarLibVec;
  ang: NodeWarLibAng;
  math: NodeWarLibMath;
  physics: NodeWarLibPhysics;
  targeting: NodeWarLibTargeting;
}

interface NodeWarMoon {
  pos: number[];
  radius: number;
  mass: number;
  velocity: number[];
  dist: number;
  dir: number;
}

interface NodeWarShip {
  friendly: bool; // bool; whether this ship is on the active ship's team
  alive: bool; // bool; whether it is alive
  queen: bool; // bool; whether it is a queen ship
  invincible: bool; // bool; whether this ship is young enough that it's invincible (or a dead shard, which also can't be broken)
  pos: number[]; // position (e.g., [0,0])
  vel: number[]; // velocity (e.g., [0,0])
  dist: number; // distance from the active ship
  dir: number; // direction from the active ship, relative to the active ship's sharpest vertex (-PI..PI); in other words, if dir is 0, the active ship is pointed directly at ships[0]
  mass: number; // mass
  rot: number; // the angle the ship's sharpest vertex is pointed at
  area: number; // the size of the ship, in square meters
  area_frac: number; // the size of the ship, relative to its first ancestor; a 1.0 is a full-sized ship, and a 0.5 is a half-area ship
  m_i: number; // the moment of inertia of the ship (specifically along the z-axis through its centroid, which is how it is torqued)
  a_vel: number; // the angular velocity of the ship (radians/sec)
  team_id: number; // the team id of the ship (an integer)
  ship_id: number; // the global id of the ship (an integer incremented when ships spawn in the game)
  age: number; // the age of the ship
}

interface NodeWarWorld {
  const: NodeWarConstants;
  game: NodeWarGameInfo;
  mothership: any;
  moons: NodeWarMoon[];
  ships: NodeWarShip[];
  me: NodeWarShip;
  lib: NodeWarLib;
}

interface NodeWarAI {
  step: (o: NodeWarWorld) => NodeWarCommand;
}

declare var ai: NodeWarAI;
