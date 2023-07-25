<div id="top"></div>

[contributors-shield]: https://img.shields.io/github/contributors/khaled-samy/Shovice?style=for-the-badge
[contributors-url]: https://github.com/khaled-samy/Shovice/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/khaled-samy/Shovice?style=for-the-badge
[forks-url]: https://github.com/khaled-samy/Shovice/network/members
[stars-shield]: https://img.shields.io/github/stars/khaled-samy/Shovice?style=for-the-badge
[stars-url]: https://github.com/khaled-samy/Shovice/stargazers
[issues-shield]: https://img.shields.io/github/issues/khaled-samy/Shovice?style=for-the-badge
[issues-url]: https://github.com/khaled-samy/Shovice/issues
[license-shield]: https://img.shields.io/github/license/khaled-samy/Shovice?style=for-the-badge
[license-url]: https://github.com/khaled-samy/Shovice/blob/master/LICENSE.txt

[![Contributors][contributors-shield]][contributors-url]
<br />
[![Forks][forks-shield]][forks-url]
<br />
[![Stargazers][stars-shield]][stars-url]
<br />
[![Issues][issues-shield]][issues-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/khaled-samy/Shovice">
    <img src="https://i.imgur.com/1heaiby.png" alt="Logo" width="160" height="160">
  </a>

<h1 align="center">Shovice</h1>

  <p align="center">
       An E-commerce website that allows users to buy Electronic products online.
    <br />
    <br />
    <a href="https://www.figma.com/file/AELziAbfAi4c1EFqHrCsFE/E-Store?type=design&node-id=0-1&mode=design&t=GO3EkSKbwgE0uM1p-0">Design Link</a>
    ·
    <a href="https://github.com/khaled-samy/Shovice/issues">Report Bug</a>
    ·
    <a href="https://github.com/khaled-samy/Shovice/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#problem">Problem</a></li>
        <li><a href="#solution">Solution</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li>
          <a href="#user-stories">User Stories</a>
            <ul>
                <li><a href="#admin-stories">As a Admin</a></li>
                <li><a href="#buyer-stories">As a Buyer</a></li>
            </ul>
          </li>           <li>
          <a href="#user-journey">User Journey</a>
          <ul>
              <li><a href="#admin-journey">As a Admin</a></li>
                <li><a href="#buyer-journey">As a Buyer</a></li>
          </ul>
          </li> 
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project <span id="about-the-project"></span>

<img src="https://i.imgur.com/KO6iw0N.png" />

<p align="right">(<a href="#top">back to top</a>)</p>

### Problem <span id="problem"></span>
In this modern era, it has become difficult to directly buy the local products that the customer wants, due to many problems, including the high prices of local products and the difficulty of purchasing them with the possibility that the product is unavailable within the country.
### Solution <span id="solution"></span>
Today we live in the era of technology, so we have become dependent on the Internet to accomplish many tasks in our lives and solve many problems, hence the idea of establishing an electronic device store `Shovice` through which the customer can buy any device he wants with high specifications and quality.

### Built With <span id="built-with"></span>

* [EJS](https://ejs.co/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JavaScript](https://www.javascript.com/)
* [Express.js](https://expressjs.com/)
* [MongoDb](https://www.mongodb.com/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started <span id="getting-started"></span>

To get a local copy up and running follow these simple example steps.

### Prerequisites <span id="prerequisites"></span>

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation <span id="installation"></span>

1. Clone the repo
   ```sh
   git clone https://github.com/khaled-samy/Shovice.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. In the project root folder, create a new file `.env` and fill in the environment variables
   ```sh
   PORT='<your port>'
   TOKEN_KEY='<your token key>'
   ```
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage <span id="usage"></span>
### User Stories <span id="user-stories"></span>
#### As a admin who wants to manages the site: <span id="admin-stories"></span>
- I can see the top-selling product rankings and the number of buyers.
- I can add products to the home page.
- I can control the product operations, whether (edit/delete).
- I can see the most recent orders and their full price.
- I can see order details from user products and information and edit order status.
- I can announce to all users the latest news from the messages page.

#### As a buyer who wants to buy a products: <span id="buyer-stories"></span>
- I can see current products from the home page.
- I can filter products by categories, search by name, and change the look.
- I can see the details of the specific product by going to the product page.
- I can add products to my cart.
- I can go to the cart page and remove the products or continue with the purchase.


### User Journey <span id="user-journey"></span>
#### As a **ADMIN** <span id="admin-journey"></span>
- once you log in to the site as an admin, you will go directly to the site's `dashboard`, where you can see the important statistics within the site, including purchases and the number of users.
- Then you can go to the `products` page by clicking on it in the control links in the north of the site, in which you can see all the products added within it with the ability to modify or delete any product you want.
- Also, by going to the `Add Product` page, through which you can add any new product, you can see it on the Products page.
- You can see the latest purchases from customers by going to the `orders` page, and see the status of each purchase with its time
- When you click on the `purchase order` from the purchase orders table, you will be taken to the page of the relevant purchase process and you can see the details of the information of the order itself with the customer’s information in addition to seeing the products of the order with their total price
- Finally, there is a `message` page in case the admin wishes to inform or announce something to all users within the site.

#### As a **BUYER** <span id="buyer-journey"></span>
- once you visit the site, you will see on the `home` page all the products available in the store, with the ability to search for any product, filter the products by classification, and change the look of the site.
- Then, if you continue to scroll down, you will see a box that contains the most purchased and most recent products and the most prominent users in the store.
- If you click on any product, you will go to the `product` page itself, where you will find product details such as description, price, color, and size. If you scroll down, you will find other products that may interest you as well.
- If you try to press the `Add to Cart` button on the product or go to the `cart` page or the `messages` page while you are not registered with the site, it will take you to the `login` page in order to create an account for you within the site in order to complete the purchases.
- When you register on the site, you can go to your `cart` page and see all the products added with their price inside it, with the ability to adjust the quantity of the product if its quantity is available in the store, or remove the product itself from your cart.
- In the event that you are sure of your added products, you can complete the purchase process by clicking on the `checkout to proceed` button, then an interface will appear asking you to enter the name of the purchase order with the name of the country in which you reside, then the confirmation button.
- Finally, on the `messages` page, you can see the latest announcements and store news from the admin himself


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing <span id="contributing"></span>

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License <span id="license"></span>

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact <span id="contact"></span>
### The project was done by
- Khaled El Khudary - [@khaled-samy](https://github.com/khaled-samy) - khaled.s.elkhudary@gmail.com

Project Link: [https://github.com/khaled-samy/Shovice](https://github.com/khaled-samy/Shovice)

<p align="right">(<a href="#top">back to top</a>)</p>
