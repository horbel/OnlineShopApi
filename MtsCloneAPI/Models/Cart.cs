using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MtsCloneAPI.Context;

namespace MtsCloneAPI.Models
{
    public class Cart
    {
        private List<CartLine> cartLine;
        public void AddItem(CartLine lineParam)
        {
            CartLine line = cartLine.FirstOrDefault(x => x.Product.ID == lineParam.Product.ID);
            if (line == null)
            {
                cartLine.Add(lineParam);                
            }
            else
            {
                line.Quantity += lineParam.Quantity;
            }
        }
        public void RemoveLine(Product product)
        {
            cartLine.RemoveAll(x => x.Product.ID == product.ID);
        }
        public decimal ComputeTotalValue()
        {
            return cartLine.Sum(e => e.Product.Price * e.Quantity);
        }
        public void Clear()
        {
            cartLine.Clear();
        }
        public IEnumerable<CartLine> Lines
        {
            get { return cartLine; }
        }
    }
    public class CartLine
    {
        public Product Product { get; set; }
        public int Quantity { get; set; }        
        public CartLine(Product prod, int quantity)
        {
            Product = prod;
            Quantity = quantity;
        }
    }
}