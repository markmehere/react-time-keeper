using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using time_keeper.Models;

namespace time_keeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoldersController : ControllerBase
    {
        private readonly HolderContext _context;

        public HoldersController(HolderContext context)
        {
            _context = context;
        }

        // GET: api/Holders
        [HttpGet]
        public IEnumerable<Holder> GetHoldingUser()
        {
            return _context.HoldingUser;
        }

        // GET: api/Holders/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHolder([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var holder = await _context.HoldingUser.FindAsync(id);

            if (holder == null)
            {
                return NotFound();
            }

            return Ok(holder);
        }

        // PUT: api/Holders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHolder([FromRoute] string id, [FromBody] Holder holder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != holder.holder)
            {
                return BadRequest();
            }

            _context.Entry(holder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HolderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Holders
        [HttpPost]
        public async Task<IActionResult> PostHolder([FromBody] Holder holder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.HoldingUser.Add(holder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHolder", new { id = holder.holder }, holder);
        }

        // DELETE: api/Holders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHolder([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var holder = await _context.HoldingUser.FindAsync(id);
            if (holder == null)
            {
                return NotFound();
            }

            _context.HoldingUser.Remove(holder);
            await _context.SaveChangesAsync();

            return Ok(holder);
        }

        private bool HolderExists(string id)
        {
            return _context.HoldingUser.Any(e => e.holder == id);
        }
    }
}