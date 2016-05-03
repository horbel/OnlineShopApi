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
    public class CartController : ApiController
    {
        private Cart cart;
        [HttpGet]
        public Cart Cart()
        {
            if (cart != null)
                return cart;
            else
                return null;
        }

        [HttpPost]
        public void Create()
        {
            cart = new Cart();
        }
        [HttpPut]
        public void Add(CartLine line)
        {
            cart.AddItem(line);
        }
        [HttpDelete]
        public void Delete(Product product)
        {
            cart.RemoveLine(product);
        }
    }
}
