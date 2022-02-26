import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
    en: {
      charge: "Charges of",
      amnt: "Amount",
      ser: "Select Service",
      opr: "Select Operation",
      instr: "Press to get charge",
      enter: "Enter Amount",
      calc: "Calculate",
      retM: "MTN Withdrawal",
      retO: "Orange Withdrawal",
      retEU: "EUMoney Withdrawal",
      trans: "MTN to MTN",
      nonTrans: "MTN to a non MTN Client",
      trans2: "Orange to Orange client",
      nonTrans2: "Orange to a non Orange Client",
      trans3: "EuMoney to EuMoney client",
      nonTrans3: "EuMoney to a non MTN Client",
      press: "Press Calcualte Button",
      tittle:"Charges Calculator",
        con: "Currency Converter",
        enter:"Please Enter Amount",
        dec:"Please remove Decimal"

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
      trans: "MTN a MTN",
      nonTrans: "MTN a non Client MTN ",
      trans2: "Orange a Orange",
      nonTrans2: "Orange a Client non Orange ",
      trans3: "EuMoney a EuMoney",
      nonTrans3: "EuMoney a Client non EuMoney ",
      press: "Appuyer sur le Button Calculer",
      tittle: "Calculatrice de frais",
      con:"Convertisseur de Devise",
      enter: "Veuillez entrer le montant",
      dec:"Veuillez supprimer la décimale"

    },
  };
  

  i18n.fallbacks = true;
  i18n.locale = Localization.locale;
  Localization.getLocalizationAsync();
  
export default i18n;