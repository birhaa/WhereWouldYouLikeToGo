import * as THREE from 'three';
import * as LostCityTrek from './places/lostcitytrek/lostcitytrek'
import * as Tayonara from './places/tayonara/tayonara'
import * as Memory3 from './places/rainbowmountain/rainbowmountain'
import * as SalarDeUyuni from './places/salardeuyuni/salardeuyuni'


const timeLineInterval = 20;
let lastPlace = 0;
const nextPlace = () => lastPlace+= timeLineInterval


const init = function(scene){

  scene.add( LostCityTrek.init(lastPlace) );
  scene.add( Tayonara.init(nextPlace()) );
  scene.add( Memory3.init(nextPlace()) );
  scene.add(SalarDeUyuni.init(nextPlace()));

}

const update = function(){
}

export {
  init,
  update
};
