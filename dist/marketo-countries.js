/**
 * NAME: MARKETO COUNTRIES JS
 * PURPOSE: 
 * 1) Change opt-in messages and to show/hide checkbox based on the country specified
 * 2) Strip Marketo default CSS and inline styles
 * VERSION: 1.0.0
 * LAST UPDATED: July 24, 2019
 * REQUIREMENTS: jQuery & MktoForms2
 */

// Marketo GDPR object.
var mkto_cnt = {};
// if init() has run.
mkto_cnt.init_ran = false;
// errors with environment.
mkto_cnt.env_error = 0;
// Marketo forms 2.0.
mkto_cnt.mktoFormsJsApi = {};
// Double opt-in countries.
mkto_cnt.doi_countries = ["Australia", "Austria", "Belgium", "Bulgaria", "Canada", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "United Kingdom"];
// Default language.
mkto_cnt.lang = 'en';
// The messages object.
mkto_cnt.mssg = {};
// English (en):
mkto_cnt.mssg.en = {
  soi: "By submitting this form I am agreeing to receive periodic emails from UL LLC (UL) containing best practices, education, industry research, news, updates and promotions related to UL’s products and services. I understand that I can unsubscribe at any time and agree to UL’s Online Policies. ",
  doi: "I agree to receive periodic emails from UL LLC (UL) containing best practices, education, industry research, news, updates and promotions related to UL’s products and services. I understand that I can unsubscribe at any time and agree to UL’s Online Policies."
};
// German (de):
mkto_cnt.mssg.de = {
  soi: "Durch Einreichen dieses Formulars stimme ich zu, regelmäßig E-Mails von UL LLC (UL) mit Inhalten zu den Themen Best Practices, industrielle Forschung, Neuigkeiten, Updates und Werbeaktionen im Zusammenhang mit Produkten und Dienstleistungen von UL zu erhalten. Ich verstehe, dass ich das Abonnement jederzeit kündigen kann und stimme den Online-Richtlinien von UL zu.",
  doi: "Ich möchte regelmäßig E-Mails von UL LLC (UL) mit Inhalten zu den Themen Best-Practices, industrielle Forschung, Neuigkeiten, Updates und Werbeaktionen im Zusammenhang mit Produkten und Dienstleistungen von UL erhalten. Ich verstehe, dass ich das Abonnement jederzeit kündigen kann und stimme den Online-Richtlinien von UL zu."
};
// Spanish (es):
mkto_cnt.mssg.es = {
  soi: "Acepto recibir correos electrónicos periódicos de UL LLC (UL) que contengan las mejores prácticas, educación, investigación de la industria, noticias, actualizaciones y promociones relacionadas con los productos y servicios de UL. Entiendo que puedo cancelar mi suscripción en cualquier momento y acepto las Políticas en línea.",
  doi: "Al enviar este formulario, acepto recibir correos electrónicos periódicos de UL LLC (UL) que contengan las mejores prácticas, educación, investigación de la industria, noticias, actualizaciones y promociones relacionadas con los productos y servicios de UL. Entiendo que puedo cancelar mi suscripción en cualquier momento y acepto las Políticas en línea."
};
// French (fr):
mkto_cnt.mssg.fr = {
  soi: "En soumettant ce formulaire, j'accepte de recevoir des courriers électroniques périodiques d’UL LLC (UL) contenant des informations sur les meilleures pratiques, l’éducation, la recherche industrielle ainsi que des actualités, mises à jour et promotions relatives aux produits et services d’UL. Je sais que je peux me désabonner à tout moment et j’accepte les politiques en ligne d’UL.",
  doi: "Je souhaite recevoir des e-mails périodiques d’UL LLC (UL) contenant des informations sur les meilleures pratiques, les formations et la recherche industrielle, ainsi que des actualités, mises à jour et promotions relatives aux produits et services d’UL. Je sais que je peux me désabonner à tout moment et j’accepte les politiques en ligne d’UL."
};
// Italian (it):
mkto_cnt.mssg.it = {
  soi: "Inviando questo modulo accetto di ricevere e-mail periodiche da UL LLC (UL) contenenti best practice, iniziative di formazione, risultati delle ricerche settoriali, novità, aggiornamenti e promozioni sui prodotti e servizi di UL. So di poter annullare l’iscrizione in qualunque momento e accetto le Policy online di UL.",
  doi: "Desidero ricevere e-mail periodiche da UL LLC (UL) contenenti best practice, materiale formativo, ricerche di settore, news, aggiornamenti e promozioni su prodotti e servizi di UL. Sono consapevole di potere annullare la sottoscrizione in qualsiasi momento e accetto le politiche online UL."
};
// Japanese (ja):
mkto_cnt.mssg.ja = {
  soi: " このフォームを送信することにより、私はULの製品およびサービスに関する事例、案内、業界情報、ニュース、最新情報、広告などの電子メールをUL LLC (UL) から定期的に受け取ることに合意します。これらのメールはいつでも配信停止できることを認識しています。また、ULのオンラインポリシーに同意します。",
  doi: "UL LLC (UL)の製品およびサービスに関する事例、案内、業界情報、ニュース、最新情報、広告などの電子メールをULから定期的に受け取ることを了承します。これらのメールはいつでも配信停止できることを認識しています。また、ULのオンラインポリシーに同意します。"
};
// Korean (ko):
mkto_cnt.mssg.ko = {
  soi: "이 양식을 제출함으로써 UL의 제품 및 서비스와 관련된 모범 사례, 교육, 업계 연구, 뉴스, 업데이트 및 프로모션을 내용으로 포함하는 UL LLC(UL)의 정기 이메일을 수신하는 데 동의합니다. 본인은 언제든지 구독을 취소할 수 있음을 이해하며 UL의 온라인 정책에 동의합니다.",
  doi: "UL의 제품 및 서비스와 관련된 모범 사례, 교육, 업계 연구, 뉴스, 업데이트 및 프로모션을 내용으로 포함하는 UL LLC(UL)의 정기 이메일을 수신하는 데 동의합니다. 본인은 언제든지 구독을 취소할 수 있음을 이해하며 UL의 온라인 정책에 동의합니다."
};
// Portuguese (pt_br):
mkto_cnt.mssg.pt_br = {
  soi: "Enviando este formulário, eu concordo em receber e-mails periódicos da UL LCC (UL) contendo as boas práticas em educaçâo, pesquisa da indústria, notícias, atualizaçôes e promoçôes relacionadas aos produtos e serviços da UL. Entendo que posso cancelar a inscriçâo a qualquer momento e segundo as Políticas Online da UL.",
  doi: "Eu gostaria de receber e-mails periódicos da UL LLC (UL) sobre boas práticas, treinamentos, pesquisas, notícias, atualizaçôões e promoçôões relacionadas aos produtos e serviços da UL. Estou ciente de que posso cancelar o recebimento a qualquer momento e aceito as Políticas Online da UL."
};
// Turkish (tr):
mkto_cnt.mssg.tr = {
  soi: "Bu formu gönderdiğimde, UL LLC’den (UL) UL’in ürün ve hizmetlerine ilişkin en iyi uygulamalar, eğitim, sektör araştırmaları, haberler, güncellemeler ve promosyonlar ile ilgili düzenli olarak e-posta almayı kabul etmiş oluyorum. İstediğim zaman aboneliğimi iptal edebileceğimi anlıyor ve UL’in çevrimiçi Politikalarını kabul ediyorum.",
  doi: "UL LLC’den (UL) UL’in ürün ve hizmetlerine ilişkin en iyi uygulamalar, eğitim, sektör araştırmaları, haberler, güncellemeler ve promosyonlar ile ilgili düzenli olarak e-posta almayı kabul ediyorum. İstediğim zaman aboneliğimi iptal edebileceğimi anlıyor ve UL’in çevrimiçi Politikalarını kabul ediyorum."
};
// Chinese Simp. (zh_hans):
mkto_cnt.mssg.zh_hans = {
  soi: "通过提交此表单，我同意定期收到UL LLC（UL）的电子邮件，其中包含与UL产品和服务相关的最佳实践，教育，行业研究，新闻，更新和促销。 我了解我可以随时取消订阅并同意UL的在线政策。",
  doi: "我希望收到来自 UL LLC (UL) 的包含与 UL 产品和服务的最佳实践、教育、行业研究、新闻、更新及推广的定期电邮。我明白我可以随时退订并同意遵守 UL 的在线政策。"
};
// Chinese Trad. (zh_hant):
mkto_cnt.mssg.zh_hant = {
  soi: "通過提交此表單，我同意定期收到UL LLC（UL）的電子郵件，其中包含與UL產品和服務相關的最佳實踐，教育，行業研究，新聞，更新和促銷。 我了解我可以隨時取消訂閱並同意UL的在線政策。",
  doi: "一旦提交資料後，即表示本人同意收到由 UL LLC (UL) 定期發送的電子報，內容包括與 UL 產品和服務相關的最佳實作、培訓課程、產業研究、新聞、動態和促銷活動。本人亦同意 UL 的線上政策，並了解我能隨時取消訂閱 UL。"
};

// Find a value in an array:
mkto_cnt.find_in_array = function(needle, haystack){
  "use strict";
  for(var i=0; i < haystack.length; i++){
    if(needle === haystack[i]){
      return true;
    }
  }
  return false;
};

// Look for marketo forms on the page.
mkto_cnt.mkto_forms_exist = function(){
  "use strict";
  var exists = false;
  jQuery('form').each(function(){
    if(typeof jQuery( this ).attr('id') !== 'undefined'){
      if(jQuery(this).attr('id').indexOf('mktoForm_') !== -1){
        exists = true;
      }
    }
  });
  return exists;
};

// Add classes that the JS can interact with:
mkto_cnt.mkto_add_classes = function(){
  "use strict";
  // Create new label for="emailOptin" with needed class
  var $label = jQuery("<label>").attr({
    for:'emailOptin',
    class: 'gdpr_mssg'
  }).text('(Loading...)');
  // Insert new label
  jQuery('#emailOptin').after($label);
  // Add class to form row
  jQuery('#emailOptin').closest('.mktoFormRow').addClass('gdpr_wrap')
  // add class for country input
  jQuery('form select').each(function(){
    if('Country' === jQuery(this).attr('id')){
      jQuery(this).addClass('gdpr_select');
    }
  });
};

// Update the language of the messages:
mkto_cnt.mkto_update_lang = function(){
  "use strict";
  var new_lang = false;
  if(typeof window.optinlang !== 'undefined'){
    new_lang = window.optinlang.replace("-", "_");
  }
  else if(typeof window.$language !== 'undefined'){
    new_lang = window.$language.replace("-", "_");
  }
  if(new_lang){
    switch(new_lang){
      case 'pt':
        new_lang = 'pt_br';
        break;
      case 'jp':
        new_lang = 'ja';
        break;
      case 'zh_cn':
        new_lang = 'zh_hans';
        break;
      case 'zh_hk':
        new_lang = 'zh_hant';
        break;
    }
  }
  if(new_lang){
    mkto_cnt.lang = new_lang;
  }
};

// Updates the "loading" message:
mkto_cnt.mkto_do_initial_mssg = function(){
  "use strict";
  jQuery('.gdpr_mssg').html(this.mssg[this.lang].doi);
};

// Fires each time a new country is selected:
mkto_cnt.mkto_do_update = function(elem){
  "use strict";
  var formID = '#' + elem.closest('form').attr('id');
  var gdpr_doi_input = jQuery(formID + ' #emailOptin');
  var form_mssg_wrap = jQuery(formID + ' .gdpr_mssg');
  var form_select_val = jQuery(formID + ' .gdpr_select').val();
  // Double opt-in:
  if(mkto_cnt.find_in_array(form_select_val, mkto_cnt.doi_countries)){
    if(form_mssg_wrap.hasClass('gdpr_soi')){
      gdpr_doi_input.show().removeClass('hidden');
      form_mssg_wrap.removeClass('gdpr_soi').html(mkto_cnt.mssg[mkto_cnt.lang].doi);
    }
  }
  // Single opt-in:
  else {
    if(!form_mssg_wrap.hasClass('gdpr_soi')){
      gdpr_doi_input.hide().addClass('hidden');
      form_mssg_wrap.addClass('gdpr_soi').html(mkto_cnt.mssg[mkto_cnt.lang].soi);
    }
  }
};

// Strip css styles from marketo forms:
mkto_cnt.mkto_remove_styles = function(){
  "use strict";
  jQuery('#mktoForms2BaseStyle, #mktoForms2ThemeStyle, .mktoClear, .mktoGutter, .mktoOffset, .mktoForm style').remove();
  jQuery('.mktoHasWidth, .mktoFormCol, .mktoButtonWrap').removeAttr('style').removeClass('mktoHasWidth');
  jQuery('<span class="required asterisk">*</span>').replaceAll('.mktoRequiredField .mktoAsterix');
  jQuery('.mktoAsterix').remove();
  jQuery('.mktoRadioList input').wrap('<div class="mktoRadioList-item"></div>');
  jQuery('.mktoRadioList-item').append(function(){
    return jQuery(this).next('label');
  });
  jQuery('.mktoButton').addClass('button button--red');
  jQuery('.mktoForm .mktoCheckboxList input').each(function(){
    if (!jQuery(this).parent().hasClass('mktoCheckboxWrap')) {
      jQuery(this).next('label').addBack().wrapAll('<div class="mktoCheckboxWrap"/>');
    }
  });
};

// remove the initial Email Optin label and the loading div
mkto_cnt.mkto_gdpr_prep = function(){
  "use strict";
  jQuery('#optin-mssg').closest('.mktoFormRow').remove();
  jQuery('.mktoForm label[for="emailOptin"]').remove();
};

// Process the forms:
mkto_cnt.mkto_process = function(){
  "use strict";
  if(mkto_cnt.mktoFormsJsApi.hasOwnProperty('whenReady')){
    mkto_cnt.mktoFormsJsApi.whenReady(function(form){
      mkto_cnt.mkto_remove_styles();
      mkto_cnt.mkto_gdpr_prep();
      mkto_cnt.mkto_add_classes();
      mkto_cnt.mkto_update_lang();
      mkto_cnt.mkto_do_initial_mssg();
      jQuery('.gdpr_select').on('change', function(){
        mkto_cnt.mkto_do_update(jQuery(this));
      });
      jQuery('.mktoForm').on('change', 'input[type="radio"], input[type="checkbox"], select', function(){
        setTimeout(mkto_cnt.mkto_remove_styles, 300);
      });
      if(jQuery('.mktoModal').length){
        jQuery('.mktoModal').addClass('is-visible');
      }
      // https://css-tricks.com/snippets/jquery/done-resizing-event Authored by Chris Coyier:
      var resizeTimer;
      jQuery(window).on('resize', function(e){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
          mkto_cnt.mkto_remove_styles();
        }, 300);
      });
    });
  } else {
    setTimeout(mkto_cnt.mkto_process, 2000);
  }
};

// Check environment:
mkto_cnt.checkEnv = function(){
  "use strict";
  // If this already ran:
  if(mkto_cnt.init_ran){
    mkto_cnt.stopEnvCheck();
    return;
  }
  // if no jQuery
  if(typeof window.jQuery === 'undefined'){
    mkto_cnt.env_error += 1;
  }
  // else if no MktoForms2 JS API
  else if(typeof window.MktoForms2 === 'undefined'){
    mkto_cnt.env_error += 1;
  }
  // If no errors, so call init():
  if(mkto_cnt.env_error === 0){
    mkto_cnt.stopEnvCheck();
    mkto_cnt.init();
  }
};

// Clear the interval, stop checking env:
mkto_cnt.stopEnvCheck = function(){
  "use strict";
  clearInterval(mkto_cnt.begin);
  delete mkto_cnt.checkEnv;
  mkto_cnt.checkEnv = 'done';
  if(mkto_cnt.init_ran){
    delete mkto_cnt.init;
    mkto_cnt.init = 'done';
  }
};

// Check the environment and look for marketo forms:
mkto_cnt.init = function(){
  "use strict";
  // If this already ran:
  if(mkto_cnt.init_ran){
    mkto_cnt.stopEnvCheck();
    return;
  } else {
    mkto_cnt.init_ran = true;
  }
  // Add the Marketo Forms Api to the mkto_cnt object.
  mkto_cnt.mktoFormsJsApi = window.MktoForms2;
  // If marketo forms exist:
  if(mkto_cnt.mkto_forms_exist()){
    mkto_cnt.mkto_process();
  }
  // Else no marketo forms:
  else {
    return false;
  }
}; // init()

// Begin by checking the Environment for jQuery & MktoForms2
mkto_cnt.begin = setInterval(mkto_cnt.checkEnv, 2000);
