/**
 * Created by Haolin<haolinhom@gmail.com> on 2018/9/5.
 */
import {sendDataBuryingPoint} from 'SERVICE/common'

export default {
  name:'dataBuryingPoint',
  send(params){
    sendDataBuryingPoint(params,true).then(data=>{},err=>console.error(err));
  }
};
