$(document).ready(function() {
  const section = $(".s--services");
  const requestURL = "/src/JSON/a.json";
  let Categories = [];
  let subCategoriesData = {};

  class Entity {
    static idCounter = 0;

    constructor() {
      this.id = ++Entity.idCounter;
    }

    getId() {
      return this.id;
    }
  }

  class Service extends Entity {
    constructor(serviceID, name, costs) {
      super();
      this.serviceID = serviceID;
      this.name = name;
      this.costs = costs;
    }

    getId() {
      return this.serviceID;
    }
  }

  class Category extends Entity {
    constructor(id, title, distances, services) {
      super();
      this.id = id;
      this.title = title;
      this.distances = distances;
      this.services = services.map(
        (serviceData) =>
          new Service(serviceData.serviceID, serviceData.name, serviceData.costs)
      );
      this.serviceDataArray = [];
      this.sortDirection = 'asc';
      this.sortArray = this.sortArray.bind(this);
    }

    createArray(service) {
      const serviceData = {
        serviceID: service.serviceID,
        name: service.name,
        costs: [...service.costs],
      };
      this.serviceDataArray.push(serviceData);
    }

    sortArray() {
      if (this.sortDirection === 'asc') {
        this.services.sort((a, b) => a.serviceID - b.serviceID);
        this.sortDirection = 'desc';
      } else {
        this.services.sort((a, b) => b.serviceID - a.serviceID);
        this.sortDirection = 'asc';
      }
      this.createTable();
    }

    createTable() {
      try {
        const categoryTitle = $("<h1>").text(this.title);
        section.append(categoryTitle);

        const table = $("<table>").prop({
          id: `table-${this.id}`,
          className: "tg"
        });
        const tbody = $("<tbody>");

        const headerRow1 = $("<tr>");
        const headerCell1 = $("<th>").prop("rowSpan", 2).text("SERVICIO/TARIFA");
        const headerCell2 = $("<th>").prop("colSpan", this.distances.length).text("DISTANCIA");
        headerRow1.append(headerCell1, headerCell2);

        const headerRow2 = $("<tr>");
        for (let distance of this.distances) {
          const headerCell = $("<th>").text(distance.label);
          headerRow2.append(headerCell);
        }

        tbody.append(headerRow1, headerRow2);

        this.services.sort((a, b) => a.serviceID - b.serviceID);

        for (let service of this.services) {
          const serviceRow = $("<tr>").prop("id", `service-${service.getId()}`);
          const serviceCell = $("<td>").text(service.name);
          serviceRow.append(serviceCell);

          for (let cost of service.costs) {
            const costCell = $("<td>").text(cost);
            serviceRow.append(costCell);
          }

          tbody.append(serviceRow);
          this.createArray(service);
        }

        table.append(tbody);
        section.append(table);
        this.id++;
      } catch (error) {
        console.error("Error creating table:", error);
      }
    }

    printArray() {
      console.log(this.serviceDataArray);
    }
  }

  $.ajax({
    url: requestURL,
    type: "GET",
    dataType: "json",
    success: function(data) {
      try {
        const myServices = data;

        if (myServices && myServices.categories) {
          myServices.categories.sort((a, b) => a.id - b.id);

          Categories = myServices.categories.map(categoryData => new Category(
            categoryData.id,
            categoryData.title,
            categoryData.distances,
            categoryData.services
          ));

          myServices.categories.forEach(categoryData => {
            const subcategories = {};
            categoryData.services.forEach(service => {
              subcategories[service.name] = service.serviceID;
            });
            subCategoriesData[categoryData.id] = subcategories;
          });

          for (let category of Categories) {
            category.sortArray();
          }
        } else {
          console.error('Invalid JSON format or missing categories.');
        }
      } catch (error) {
        console.error('Error processing JSON:', error);
      }
    },
    error: function(xhr, status, error) {
      console.error('Error fetching JSON:', error);
    }
  });

  function updateSubcategories() {
    const selectedCategory = $("#select--category-principal").val();
    const subcategories = subCategoriesData[selectedCategory] || {};
    $("#select--subcategory").empty();
    for (let subcategory in subcategories) {
      const option = $("<option>").prop({
        value: subcategories[subcategory],
        text: subcategory
      });
      $("#select--subcategory").append(option);
    }
  }

  $("#select--category-principal").change(updateSubcategories);
  
  function buscarElemento() {
    const selectedCategory = $("#select--category-principal").val();
    const selectedSubcategory = $("#select--subcategory").val();
    const elementId = `service-${selectedSubcategory}`;
  
    updateSubcategories();
  
    const elementToFocus = $("#" + elementId);
    if (elementToFocus.length) {
      elementToFocus.attr('tabindex', '-1').focus().css('background-color', 'yellow').animate({ backgroundColor: '' }, 1000);
    }
    console.log(elementId);
    console.log(selectedSubcategory);
  }
  $("#aBus").click(buscarElemento);
});
