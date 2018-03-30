import React from 'react';
import {Link} from 'react-router';
import Linechart from '../../general/charts/LineChart';
// import ProcessingLine from '../Processingline/Processingline';

export default class MachineChartInfo extends React.Component {
        render()
{    
     
  
const { title } = this.props;
        return(
<div>            
          <div className="col-md-3">
            <div className="block">
            
              <div className="machinecard">
      <i className="fa fa-cog fa-spin fa-lg fa-fw"></i>
<span class="sr-only"></span>   
          
       <h5><i className="fa fa-industry fa-lg" aria-hidden="false"></i> Machine Id: M001</h5>

   <h5><i className="fa fa-thermometer-empty fa-lg" aria-hidden="false"></i>Temperature:{title} </h5>
       <h5>Vibration   :</h5> <h5>{title}</h5>
       <h5>Oil Level   :</h5> <h5>1.05 ltr</h5> 
</div>
</div>

  </div>
<div className="col-lg-12 col-md-12 col-xs-48">    <Linechart/>
</div>
  </div>

    

   );
    }
}


