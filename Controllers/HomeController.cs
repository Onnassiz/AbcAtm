using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AbcAtm.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            HttpContext.Session.Remove("Token");
            return View();
        }
    }
}
