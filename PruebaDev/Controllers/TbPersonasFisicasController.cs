using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PruebaDev.Models;

namespace PruebaDev.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TbPersonasFisicasController : ControllerBase
    {
        private readonly PruebaDevContext _context;

        public TbPersonasFisicasController(PruebaDevContext context)
        {
            _context = context;
        }

        // GET: api/TbPersonasFisicas
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TbPersonasFisicas>>> GetTbPersonasFisicas()
        {
            var rsp = await _context.TbPersonasFisicas
                                    .FromSqlRaw("SELECT * FROM Tb_PersonasFisicas WHERE Activo = 1")
                                    .ToListAsync();
            return rsp;
        }

        // GET: api/TbPersonasFisicas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbPersonasFisicas>> GetTbPersonasFisicas(int id)
        {
            var tbPersonasFisicas = await _context.TbPersonasFisicas.FindAsync(id);

            if (tbPersonasFisicas == null)
            {
                return NotFound();
            }

            return tbPersonasFisicas;
        }

        // PUT: api/TbPersonasFisicas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<List<RespuestaSP>> PutTbPersonasFisicas(int id, TbPersonasFisicas tbPersonasFisicas)
        {
            var id_p = new SqlParameter("@IdPersonaFisica", id);
            var nombre = new SqlParameter("@Nombre", tbPersonasFisicas.Nombre);
            var apellido_paterno = new SqlParameter("@ApellidoPaterno", tbPersonasFisicas.ApellidoPaterno);
            var apellido_materno = new SqlParameter("@ApellidoMaterno", tbPersonasFisicas.ApellidoMaterno);
            var rfc = new SqlParameter("@RFC", tbPersonasFisicas.Rfc);
            var fecha_nacimiento = new SqlParameter("@FechaNacimiento", tbPersonasFisicas.FechaNacimiento);
            var usuario_agrega = new SqlParameter("@UsuarioAgrega", tbPersonasFisicas.UsuarioAgrega);

            var rsp = await _context.Set<RespuestaSP>()
                              .FromSqlRaw("EXEC sp_ActualizarPersonaFisica @IdPersonaFisica, @Nombre, @ApellidoPaterno, "
                              + "@ApellidoMaterno, @RFC, @FechaNacimiento, @UsuarioAgrega",id_p ,nombre, apellido_paterno,
                                                                            apellido_materno, rfc, fecha_nacimiento, usuario_agrega)
                              .ToListAsync();
            return rsp;
        }

        // POST: api/TbPersonasFisicas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<List<RespuestaSP>> PostTbPersonasFisicas( [FromBody] TbPersonasFisicas tbPersonasFisicas )
        {
            var nombre = new SqlParameter("@Nombre", tbPersonasFisicas.Nombre);
            var apellido_paterno = new SqlParameter("@ApellidoPaterno", tbPersonasFisicas.ApellidoPaterno);
            var apellido_materno = new SqlParameter("@ApellidoMaterno", tbPersonasFisicas.ApellidoMaterno);
            var rfc = new SqlParameter("@RFC", tbPersonasFisicas.Rfc);
            var fecha_nacimiento = new SqlParameter("@FechaNacimiento", tbPersonasFisicas.FechaNacimiento);
            var usuario_agrega = new SqlParameter("@UsuarioAgrega", tbPersonasFisicas.UsuarioAgrega);

            var rsp = await _context.Set<RespuestaSP>()
                              .FromSqlRaw("EXEC sp_AgregarPersonaFisica @Nombre, @ApellidoPaterno, " 
                              + "@ApellidoMaterno, @RFC, @FechaNacimiento, @UsuarioAgrega", nombre, apellido_paterno, 
                                                                            apellido_materno, rfc, fecha_nacimiento, usuario_agrega)
                              .ToListAsync();
            return rsp;
        }

        // DELETE: api/TbPersonasFisicas/5
        [HttpDelete("{id}")]
        public async Task<List<RespuestaSP>> DeleteTbPersonasFisicas(int id)
        {
            var id_persona = new SqlParameter("@IdPersonaFisica", id);
            var rsp = await _context.Set<RespuestaSP>()
                              .FromSqlRaw("EXEC sp_EliminarPersonaFisica @IdPersonaFisica", id_persona)
                              .ToListAsync();

            return rsp;
        }

        private bool TbPersonasFisicasExists(int id)
        {
            return _context.TbPersonasFisicas.Any(e => e.IdPersonaFisica == id);
        }
    }
}
