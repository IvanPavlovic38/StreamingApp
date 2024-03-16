using projectStreaming.Data;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();


builder.Services.AddSwaggerGen(sgo =>
{ 

    var o = new Microsoft.OpenApi.Models.OpenApiInfo()
    {
        Title = "Streaming APP",
        Version = "v1",

        License = new Microsoft.OpenApi.Models.OpenApiLicense()
        {
            Name = "Edukacijska licenca"
        }
    };
    sgo.SwaggerDoc("v1", o);

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    sgo.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

});



builder.Services.AddDbContext<StreamingContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString(name: "StreamingContext"))
);



var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger(opcije =>
    {
        opcije.SerializeAsV2 = true;
    });
// mogućnost generiranja poziva rute u CMD i Powershell
app.UseSwaggerUI(opcije =>
{
    opcije.ConfigObject.
    AdditionalItems.Add("requestSnippetsEnabled", true);
});
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseDefaultFiles();
app.UseDeveloperExceptionPage();
app.MapFallbackToFile("index.html");

app.Run();