using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MtsCloneAPI.Context;

namespace MtsCloneAPI.Context
{
    public interface IProductRepository
    {
        IQueryable<Product> Products { get; }
        IQueryable<Brand> Brands { get;  }
        IQueryable<ProductType> Types { get;  }

        void Edit(object entity);
        
    }
}
