using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MtsCloneAPI.Context;

namespace MtsCloneAPI.Controllers
{
    public class TypeController : ApiController
    {
        private MtsDBEntities db = new MtsDBEntities();

        // GET: api/Type
        public IEnumerable<ProductType> GetProductTypes()
        {
            return db.ProductTypes;
        }

        // GET: api/Type/5
        [ResponseType(typeof(ProductType))]
        public IHttpActionResult GetProductType(int id)
        {
            ProductType productType = db.ProductTypes.Find(id);
            if (productType == null)
            {
                return NotFound();
            }

            return Ok(productType);
        }

        // PUT: api/Type/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProductType(int id, ProductType productType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productType.ID)
            {
                return BadRequest();
            }

            db.Entry(productType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Type
        [ResponseType(typeof(ProductType))]
        public IHttpActionResult PostProductType(ProductType productType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductTypes.Add(productType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = productType.ID }, productType);
        }

        // DELETE: api/Type/5
        [ResponseType(typeof(ProductType))]
        public IHttpActionResult DeleteProductType(int id)
        {
            ProductType productType = db.ProductTypes.Find(id);
            if (productType == null)
            {
                return NotFound();
            }

            db.ProductTypes.Remove(productType);
            db.SaveChanges();

            return Ok(productType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductTypeExists(int id)
        {
            return db.ProductTypes.Count(e => e.ID == id) > 0;
        }
    }
}