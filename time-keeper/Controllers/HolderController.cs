using Microsoft.AspNetCore.Mvc;
using time_keeper.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace time_keeper.Controllers
{
    [Route("api/")]
    [ApiController]
    public class HolderController : ControllerBase
    {
        private string holder = "Joe";

        private readonly HolderContext context;

        public HolderController(HolderContext context)
        {
            this.context = context;
        }

        [HttpGet("holder")]
        public Holder CurrentHolder()
        {
            IEnumerable<Holder> enumerable = context.HoldingUser;
            Holder[] holderList = enumerable.ToArray();
            if (holderList.Length == 0)
            {
                return new Holder("");
            }
            else
            {
                return holderList[0];
            }
        }

        [HttpPut("holder")]
        public async Task<Holder> SetHolder([FromBody] Holder newHolder)
        {
            IEnumerable<Holder> enumerable = context.HoldingUser;
            Holder[] holderList = enumerable.ToArray();
            if (holderList.Length == 0)
            {
                context.HoldingUser.Add(newHolder);
            }
            else
            {
                /*
                 * Because our user name is the primary key and we want
                 * to change it, we need to delete then add a new user.
                 * Another possibility would be to have had a dummy ID.
                 */
                context.HoldingUser.Remove(holderList[0]);
                context.HoldingUser.Add(newHolder);
            }
            await context.SaveChangesAsync();

            return newHolder;
        }

    }
}
