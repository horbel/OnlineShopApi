using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MtsCloneAPI.Context
{
    public class EFRepository : IProductRepository
    {
        private MtsDBEntities context = new MtsDBEntities();

        public IQueryable<Brand> Brands
        {
            get
            {
                return context.Brands;
            }
        }

        public IQueryable<Product> Products
        {
            get
            {
                return context.Products;
            }
        }

        public IQueryable<ProductType> Types
        {
            get
            {
                return context.ProductTypes;
            }
        }
        public void Edit(object entity)
        {
            //string type = entity.GetType().Name;
            //switch (type)
            //{
            //    case "Product":
            //        context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            //        break;
            //    case "Brand":
            //}
            context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
        }
    }
}