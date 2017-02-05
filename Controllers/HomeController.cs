using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AbcAtm.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.Name = "Hello";
            HttpContext.Session.Remove("Token");
            return View();
        }
    }
}
