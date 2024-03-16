using projectStreaming.Data;
using projectStreaming.models;
using Microsoft.AspNetCore.Mvc;

namespace projectStreaming.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class EpizodaController : ControllerBase
    {

        private readonly StreamingContext _context;

        /// <param name="context"></param>
        public EpizodaController(StreamingContext context)
        {
            _context = context;
        }


        /// <returns>Epizode u bazi</returns>
        /// <response code="200">Sve OK, ako nema podataka content-length: 0 </response>
        /// <response code="400">Zahtjev nije valjan</response>
        /// <response code="503">Baza na koju se spajam nije dostupna</response>
        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var epizode = _context.Epizode.ToList();
                if (epizode == null || epizode.Count() == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(epizode);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        /// <param name="epizoda">Epizoda za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Epizoda s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(Epizoda epizoda)
        {
            if (!ModelState.IsValid || epizoda == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Epizode.Add(epizoda);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, epizoda);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        /// <param name="sifra">Šifra epizode koja se mijenja</param>  
        /// <param name="epizoda">Epizoda za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od epizode koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi epizode koje želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Epizoda epizoda)
        {
            if (sifra <= 0 || !ModelState.IsValid || epizoda == null)
            {
                return BadRequest();
            }


            try
            {


                var epizodaIzBaze = _context.Epizode.Find(sifra);

                if (epizodaIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }



                epizodaIzBaze.Naziv = epizoda.Naziv;
                epizodaIzBaze.Trajanje = epizoda.Trajanje;
                epizodaIzBaze.Opis = epizoda.Opis;
                epizodaIzBaze.DatumIzdavnja = epizoda.DatumIzdavnja;

                _context.Epizode.Update(epizodaIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, epizodaIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }



        /// <param name="sifra">Šifra epizode koja se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi epizode koje želimo obrisati</response>
        /// <response code="503">Problem s bazom</response> 
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest();
            }

            try
            {
                var epizodaIzBaze = _context.Epizode.Find(sifra);

                if (epizodaIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Epizode.Remove(epizodaIzBaze);
                _context.SaveChanges();

                return new JsonResult(new { poruka = "Obrisano" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }



    }
}