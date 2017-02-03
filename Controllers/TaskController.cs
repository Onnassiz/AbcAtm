using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AbcAtm.Controllers
{
    public class TaskController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Token(string Id)
        {
            HttpContext.Session.SetString("Token", Id);
            return RedirectToAction("Index");
        }

        public IActionResult TokenValid()
        {
            var response = new Dictionary<string, string>();
            if (HttpContext.Session.GetString("Token") == null)
            {
                response.Add("status", "fail");
                return Json(JsonConvert.SerializeObject(response));
            }
            response.Add("status", "pass");
            return Json(JsonConvert.SerializeObject(response));
        }

        public IActionResult TakeCard()
        {
            TempData["Response"] = "Thank you for banking with us. Please take your card";
            return RedirectToAction("Index", "Home");
        }

        public IActionResult GetCash()
        {
            return View();
        }
    }
}
