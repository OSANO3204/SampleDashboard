/**

*/
class Api
{
  constructor(config)
  {
      this.config = config;
  }
  set(data)
  {
      event.preventDefault();
      this.url =  this.config.default[0];

       if (data.includes("/"))
       {
           this.data = data.split('/');
       }else
       {
           this.data = this.config[data];
           if (data.includes("="))
           {
             data = data.split('=');
             this.config[data[0]][2] = data[1];
             this.data = this.config[data[0]];
           }
       }

       this.parsedata();
  }

  parsedata()
  {
    const data = this.data
    const Form = document.getElementById(data[2]);
    const searchParams = new URLSearchParams();

    if (Form)
    {
       const formData = new FormData(Form);

       for (const pair of formData)
       {
           searchParams.append(pair['0'],pair['1']);
       }
    }else
    {
      if (data[2])
      {
        const param = data[2].split(',');

        for (var i = 0; i < param.length; i++)
        {
            searchParams.append(i, param[i]);
        }
      }else {
        console.log('Warning:no paramaters provided');
      }
    }

    searchParams.append(this.config.default[1], data[0]);
    searchParams.append(this.config.default[2], data[1]);

    var loader      = this.config.default[3];
    var receiver    = document.getElementById(data[3]);
    var loader_area = document.getElementById(data[4]);
    var plus_data   = false;

    if (data[4] == 'increment' || data[5] == 'increment')
    {
        var plus_data = true;
    }

    if (!receiver)
    {
        receiver = document.getElementsByTagName('body')[0];
    }

    if (!loader_area)
    {
        loader_area = receiver;
    }

    if (!loader)
    {
       loader = 'loading...'
    }

    loader_area.innerHTML = loader;

    this.request(searchParams,this.url,function(response)
    {
      if (response)
      {
         loader_area.innerHTML = '';
         if (plus_data)
         {
             receiver.innerHTML += response;
         }else
         {
             receiver.innerHTML = response;
         }

      }
    });
  }
  /**
  *
  *
  */
  async request(searchParams,url,callback)
  {
    await fetch(url,
    {
       method: 'POST',
       body: searchParams

    }).then(function(response)
    {
       return response.text();

    }).then(function(text)
    {
        callback(text);

    }).catch(function (error)
    {
        console.error(error);
    })
  }

  infinity(data)
  {
    // window.addEventListener("scroll", function(){
    //    console.log('hrloo');
    //
    // });
  }
}
