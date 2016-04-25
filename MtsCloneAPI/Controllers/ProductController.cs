using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MtsCloneAPI.Models;
using MtsCloneAPI.Context;

namespace MtsCloneAPI.Controllers
{
    public class ProductController : ApiController
    {
        private EFRepository repository = new EFRepository();
        
        
        public IEnumerable<Product> Get()
        {
            return repository.Products;
        }

        public Product Get(int id)
        {
            return repository.Products.First(x => x.ID == id);
        }

        [HttpPut]
        public void Edit([FromBody]Product prod)
        {
            Product dbEntity = repository.Products.FirstOrDefault(x => x.ID == prod.ID);
            if (dbEntity != null)
            {
                if (ModelState.IsValid)
                {
                    repository.Edit(prod);
                }                
            }
        }
        

    }
}
