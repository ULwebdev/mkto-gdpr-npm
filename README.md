# mkto-gdpr-npm
This package includes a JavaScript file used to interact with Marketo forms. It has two main functions: 

  1. Displays either a single or double opt-in message based upon the country selected by the user.
  2. Removes the Marketo default CSS styles and strips unneeded HTML divs from the form markup.

## Instructions for use:
  1. Download the `marketo-countries.js` file in the `/dist` directory
  2. Upload it to your server, and note the path to the file
  3. Go into Marketo and obtain the form's embed code
  4. Paste the embed code into your webpage
  5. Directly after the embed code, add the `marketo-countries.js` file
  6. Test. Test. Test. Test! And then test again! 

## Example:
For this example, let's say uploaded the JavaScript to `ul.com/assets/js/marketo-countries.js`

And the embed code you copied from Marketo is as follows:

```
<script src="//app-ab11.marketo.com/js/forms2/js/forms2.min.js"></script>
<form id="mktoForm_12345"></form>
<script>MktoForms2.loadForm("//app-ab11.marketo.com", "123-ABC-456", 12345);</script>
```

Then, all you would need to do is add the `marketo-countries.js` file like so:

```
<script src="//app-ab11.marketo.com/js/forms2/js/forms2.min.js"></script>
<form id="mktoForm_12345"></form>
<script>MktoForms2.loadForm("//app-ab11.marketo.com", "123-ABC-456", 12345);</script>
<script src="//ul.com/assets/js/marketo-countries.js"></script>
```

That's it. But, because it is simple to implement, you are not excused from thoroughly testing. You should be sure and make sure the script works for all of your test cases! We cannot stress this enough.

## Trouble shooting:
There are a few things that are required for this script to function properly:

  1. jQuery is required
  2. The Marketo Forms 2 JS API is required
  3. This script changes the GDPR message whend the `Country` form field changes. This is most commonly implemented as an HTML drop-down menu: `<select id="Country" name="Country">`. This field is required.
  4. For double opt-in countries, there should be an `emailOptin` checkbox for users to "opt-in" to emails. This form field should look like: `<input name="emailOptin" id="emailOptin" type="checkbox" value="yes" class="mktoField">`: 
  5. Lastly, there should be an empty text placeholder where the JavaScript can insert the correct opt-in message. This should be created as a Marketo rich text field with an id of `optin-mssg` and needs to be marked up similar to: `<div id="optin-mssg">(loading...)</div>`


---
**Note:** _Although this is the public repository, it's use may be limited to how UL, LLC. has structured our Marketo Forms. Nevertheless, you may be able to glean uses for this as a proof of concept, or psuedo code that you can adapt for your own project._
