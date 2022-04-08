import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
    en: {
      charge: "Charges of",
      amnt: "Amount",
      ser: "Select Service",
      opr: "Select Operation",
      instr: "Press to get charge",
      instr2: "Press to Convert",
      search:"Search Currency",

      enter: "Enter Amount",
      calc: "Calculate",
      retM: "MTN Withdrawal ",
      retO: "Orange Withdrawal ",
      retEU: "EUMoney Withdrawal ",
      trans: "MTN to MTN Transfer",
      nonTrans: "MTN To Other Network",
      trans2: "Orange to Orange Transfer",
      nonTrans2: "Orange To Other Network",
      trans3: "EUMoney to EUMoney ",
      nonTrans3: "EUMoney To Other Network ",
      press: "Press Calculate Button",
      tittle:"Charges Calculator",
        con: "Currency Converter",
        enter:"Please Enter Amount",
        dec:"Please remove Decimal",
        conve:"Convert",
        pressCalc:"Press Convert Button",
        currency:"Currencies",
        settings:"Settings",
        orangeWithdrawal: "Orange Charge: ",
        mtnWithdrawal: "MTN Momo Charge: ",
        eumoneyWithdrawal: "EUMoney Charge: ",
        totalToHave: "Total Amount To Have In Balance: ",
      tax: "Tax"

    },
    fr: {
      charge: "Frais de",
      amnt: "Montant",
      ser: "Selectionner Service",
      opr: "Selectionner Operation",
      instr: "Appuyer pour avoir les frais",
      enter: "Entrer Montant",
      calc: "Calculer",
      retM: "Retrait MTN",
      retO: "Retrait Orange",
      retEU: "Retrait EUMoney",
      trans: "Transfert MTN à MTN",
      nonTrans: "MTN à autre réseau",
      trans2: "Frais de Transfert a Orange",
      nonTrans2: "Orange à autre réseau",
      trans3: "EUmoney à EUMoney",
      nonTrans3: "EUMoney à autres réseau ",
      press: "Appuyer sur le Button Calculer",
      tittle: "Calculatrice de frais",
      con:"Convertisseur de Devise",
      enter: "Veuillez entrer le montant",
      dec:"Veuillez supprimer la décimale",
      conve:"Convertir",
      pressCalc:"Appuyer sur le Button Convertir",
      instr2: "Appuyer pour convertir",
      search:"Recherche devise",
      currency: 'Devises',
      settings:"Réglages",
      orangeWithdrawal: "Frais Orange Money: ",
      mtnWithdrawal: "Frais MTN Momo: ",
      eumoneyWithdrawal: "Frais EUMoney: ",
      totalToHave: "Montant a avoir en total: ",
      tax: "Taxe"





    },
  };
  

  i18n.fallbacks = true;
  i18n.locale = Localization.locale;
  Localization.getLocalizationAsync();
  
export default i18n;