import * as THREE from 'three';
import * as LostCityTrek from './places/lostcitytrek/lostcitytrek'
import * as Tayonara from './places/tayonara/tayonara'
import * as Memory3 from './places/rainbowmountain/rainbowmountain'
import * as SalarDeUyuni from './places/salardeuyuni/salardeuyuni'

const init = function(scene){

  scene.add( LostCityTrek.init() );
  scene.add( Tayonara.init() );
  scene.add( Memory3.init() );
  scene.add(SalarDeUyuni.init(60));

}

const update = function(){
}

export {
  init,
  update
};
