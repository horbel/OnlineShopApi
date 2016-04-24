using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MtsCloneAPI.Models;
using MtsCloneAPI.Context;

namespace MtsCloneAPI.Controllers
{
    public class HomeController : Controller
    {
        private IProductRepository repository = new EFRepository();
        public ActionResult Index()
        {
            

            return View(repository.Products.ToList());
        }
    }
}
