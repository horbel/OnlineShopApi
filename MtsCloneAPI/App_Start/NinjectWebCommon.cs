//[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(MtsCloneAPI.App_Start.NinjectWebCommon), "Start")]
//[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(MtsCloneAPI.App_Start.NinjectWebCommon), "Stop")]

//namespace MtsCloneAPI.App_Start
//{
//    using System;
//    using System.Web;
//    using MtsCloneAPI.Models;
//    using MtsCloneAPI.Context;
//    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

//    using Ninject;
//    using Ninject.Web.Common;
//    using WebApiContrib.IoC.Ninject;
//    using System.Web.Http;
//    using Ninject.Web.WebApi.Filter;
//    using System.Web.Http.Validation;
//    using System.Linq;
//    using Ninject.Web.WebApi.Validation;
//    public static class NinjectWebCommon 
//    {
//        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

//        /// <summary>
//        /// Starts the application
//        /// </summary>
//        public static void Start() 
//        {
//            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
//            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
//            bootstrapper.Initialize(CreateKernel);
//        }
        
//        /// <summary>
//        /// Stops the application.
//        /// </summary>
//        public static void Stop()
//        {
//            bootstrapper.ShutDown();
//        }
        
//        /// <summary>
//        /// Creates the kernel that will manage your application.
//        /// </summary>
//        /// <returns>The created kernel.</returns>
//        private static IKernel CreateKernel()
//        {
//            var kernel = new StandardKernel();
//            try
//            {
//                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
//                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

//                GlobalConfiguration.Configuration.DependencyResolver = new NinjectResolver(kernel);
//                RegisterServices(kernel);
//                return kernel;
//            }
//            catch
//            {
//                kernel.Dispose();
//                throw;
//            }
//        }

//        /// <summary>
//        /// Load your modules or register your services here!
//        /// </summary>
//        /// <param name="kernel">The kernel.</param>
//        private static void RegisterServices(IKernel kernel)
//        {
//            //        _kernel
//            //.Bind<DefaultModelValidatorProviders>()
//            //.ToConstant(new DefaultModelValidatorProviders(
//            //     config.Services.GetServices(
//            //         typeof(ModelValidatorProvider))
//            //     .Cast<ModelValidatorProvider>()));
            
            
//            kernel.Bind<IProductRepository>().To<EFRepository>();
//            kernel.Bind<EFRepository>().To<EFRepository>();
//        }        
//    }
//}
