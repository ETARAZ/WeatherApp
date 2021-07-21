console.log("start");
const geocoder = new maptiler.Geocoder({
    input: 'search',
    key: 'ojM8l0dqFTYmf5ofFV5u'
  });
  geocoder.on('select', (item)=> {
      const coordinates=item.geometry.coordinates.reverse().toString();
    console.log('Selected', coordinates);
    fetch('/weather',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify({
            coordinates:coordinates
        })
        
    }).then(res=>res.json()).then(data=>updateData(data));

  });
  
  const iconStatus=document.getElementsByTagName("canvas");
  const statusCity=document.querySelector('[data-status]');
  const locationCity=document.querySelector('[data-location]');
  const wind=document.querySelector('[data-wind]');
  const temp=document.querySelector('[data-temp]');
  const perc=document.querySelector('[data-perc]');
  iconStatus[0].style.backgroundImage=`url('//cdn.weatherapi.com/weather/64x64/night/113.png')`;
  const updateData = data=>{
    statusCity.textContent=data.current.condition.text;
    locationCity.textContent=data.location.name+","+data.location.country;
    wind.textContent=data.current.wind_kph+" kph";
    temp.textContent=data.current.temp_c+'\u00B0';
    iconStatus[0].style.backgroundImage=`url('${data.current.condition.icon}')`;
    perc.textContent=`${data.current.precip_in*100} %`;
  }

