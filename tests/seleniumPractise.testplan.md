# GreenKart Selenium Practise Test Plan

## Application Overview

Test plan for the GreenKart demo app at https://rahulshettyacademy.com/seleniumPractise/. Covers homepage validation, product search and filtering, cart interactions, checkout flow, and navigation behavior.

## Test Scenarios

### 1. GreenKart Core Flows

**Seed:** `tests/seed.spec.ts`

#### 1.1. Homepage load and product listing

**File:** `tests/seleniumPractise.homepage.spec.ts`

**Steps:**
  1. -
    - expect: The page loads at https://rahulshettyacademy.com/seleniumPractise/#/ with title containing "GreenKart"
  2. -
    - expect: The homepage displays the search input with placeholder "Search for Vegetables and Fruits"
  3. -
    - expect: The product catalog shows a list of items with product names, prices, quantity controls, and "ADD TO CART" buttons
  4. -
    - expect: The first visible product is Brocolli - 1 Kg and it has a price value displayed

#### 1.2. Product search and filter

**File:** `tests/seleniumPractise.search.spec.ts`

**Steps:**
  1. Enter "tom" in the search box
    - expect: The search input accepts text
  2. Trigger the search action or wait for filter to apply
    - expect: Product list is filtered to matching items only
    - expect: At least one product matching the query is visible
  3. Clear the search input or refresh the page
    - expect: The full product catalog is restored
    - expect: All expected product cards are visible again

#### 1.3. Adjust quantity and add product to cart

**File:** `tests/seleniumPractise.add-to-cart.spec.ts`

**Steps:**
  1. For a selected product, click the "+" quantity button at least once
    - expect: The quantity value increments from 1 to 2 or higher
  2. Click the "ADD TO CART" button for that product
    - expect: The product is added to the cart
    - expect: A cart indicator or preview updates with the added item
  3. Open the cart preview by clicking the cart icon
    - expect: The cart preview becomes visible
    - expect: The added product appears with name, price, and quantity information

#### 1.4. Cart preview and checkout navigation

**File:** `tests/seleniumPractise.cart-checkout.spec.ts`

**Steps:**
  1. Open the cart preview after adding one or more products
    - expect: The cart preview shows product details and a "PROCEED TO CHECKOUT" button
  2. Click "PROCEED TO CHECKOUT"
    - expect: The application navigates to the cart page at a URL containing "#/cart"
  3. -
    - expect: The cart page displays line item(s), total amount, discount amount, and a "Place Order" button

#### 1.5. Checkout country selection and order submission

**File:** `tests/seleniumPractise.checkout.spec.ts`

**Steps:**
  1. From the cart page, click "Place Order"
    - expect: The app navigates to the checkout page at a URL containing "#/country"
  2. -
    - expect: A country drop-down selector is present
    - expect: A checkbox for terms or confirmation is present
    - expect: A "Proceed" button is present
  3. Select a country from the drop-down and check the terms checkbox
    - expect: The selected country is set in the drop-down
    - expect: The checkbox can be toggled on
  4. Click "Proceed"
    - expect: The checkout action is triggered
    - expect: The order submission workflow advances or shows a success/final screen

#### 1.6. Navigation and external links

**File:** `tests/seleniumPractise.navigation.spec.ts`

**Steps:**
  1. -
    - expect: The header contains links for "Top Deals" and "Flight Booking"
  2. Click "Top Deals"
    - expect: The app navigates to the offers page at a URL containing "#/offers"
  3. Click "Flight Booking"
    - expect: The link opens or navigates to https://rahulshettyacademy.com/dropdownsPractise/

#### 1.7. Negative search and empty results

**File:** `tests/seleniumPractise.search-negative.spec.ts`

**Steps:**
  1. Enter a nonsense product name such as "xyzabc" into the search field
    - expect: The product list updates to show no matching items
    - expect: The app gracefully handles empty search results without crashing
