using projectStreaming.data;
using projectStreaming.models;
using Microsoft.AspNetCore.Mvc;


namespace projectStreaming.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class SezonaController : ControllerBase
    {

        private readonly StreamingContext _context;

        /// <param name="context"></param>
        public SezonaController(StreamingContext context)
        {
            _context = context;
        }


        /// <returns>Sezone u bazi</returns>
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
                var sezone = _context.Sezone.ToList();
                if (sezone == null || sezone.Count() == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(sezone);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        /// <param name="sezona">Sezona za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Sezona s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(Sezona sezona)
        {
            if (!ModelState.IsValid || sezona == null)
            {
                return BadRequest();
            }
            try
            {
                _context.Sezone.Add(sezona);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, sezona);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }


        /// <param name="sifra">Šifra sezone koja se mijenja</param>  
        /// <param name="smjer">Smjer za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od sezone koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi sezone koje želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Sezona sezona)
        {
            if (sifra <= 0 || !ModelState.IsValid || sezona == null)
            {
                return BadRequest();
            }


            try
            {


                var sezonaIzBaze = _context.Sezone.Find(sifra);

                if (sezonaIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }



                sezonaIzBaze.Naziv = sezona.Naziv;

                _context.Sezone.Update(sezonaIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, sezonaIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }



        /// <param name="sifra">Šifra sezone koja se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi sezone koje želimo obrisati</response>
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
                var sezonaIzBaze = _context.Sezone.Find(sifra);

                if (sezonaIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Sezone.Remove(sezonaIzBaze);
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