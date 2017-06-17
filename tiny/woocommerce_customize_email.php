<?php

echo "注文コード：" . $order->get_order_number() . "\n";
echo "注文日時：" . wc_format_datetime($order->get_date_created(), 'Y年m月d日 H時i分s秒') .  "\n";
echo "■注文者の情報\n";
echo "氏名：" . $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() . "\n";
echo "氏名（フリガナ）：\n";
echo "郵便番号：" . $order->get_billing_postcode() . "\n";
echo "住所：" . $order->get_billing_city() . "\n";
echo "電話番号：" . $order->get_billing_phone() . "\n";
echo "Ｅメールアドレス：" . $order->get_billing_email() . "\n";
echo "■支払方法\n";
echo "支払方法：" . $order->get_payment_method_title() . "\n";

echo "■注文内容\n";
foreach ( $order->get_items() as $item ) :
  $option_pos = strrpos($item->get_name(), " - ");
  $product_name = ($option_pos > 0) ? substr($item->get_name(), 0, $option_pos) : $item->get_name();
  $option_name = ($option_pos > 0) ? substr($item->get_name(), $option_pos+3) : "";

  echo "------------------------------------------------------------\n";
  echo "商品番号：" . wc_get_product($item->get_product_id())->get_sku() . "\n";
  echo "注文商品名：" . $product_name . "\n";
  echo "商品オプション：" . $option_name . "\n";
  echo "単価：￥" . wc_price(wc_get_product($item->get_product_id())->get_price(), array('currency'=>$order->get_order_currency())) . "\n";
  echo "数量：" . $item->get_quantity() . "\n";
  echo "小計：￥" . wc_price($order->get_item_subtotal($item, true, true)*$item->get_quantity(), array('currency'=>$order->get_order_currency())) . "\n";
endforeach;

echo "------------------------------------------------------------\n";
echo "商品合計：￥" . wc_price($order->get_total(), array('currency'=>$order->get_order_currency())) . "\n";
echo "税金：￥" . wc_price($order->get_total_tax(), array('currency'=>$order->get_order_currency())) . "\n";
echo "送料：￥" . $order->get_shipping_total() . "\n";
$surcharge = 0;
foreach($order->get_fees() as $fee) {
  $surcharge += intval($fee->get_total()) + intval($fee->get_total_tax());
}
echo "手数料：￥" . $surcharge . "\n";
echo "その他費用：￥0\n";
echo "ポイント利用額：￥0\n";
echo "------------------------------------------------------------\n";
echo "合計金額(税込)：￥" . $order->get_formatted_order_total() . "\n";
echo "------------------------------------------------------------\n";

echo "■届け先の情報\n";
echo "[送付先1]\n";
echo "　送付先1氏名：" . $order->get_shipping_first_name() . " " . $order->get_shipping_last_name() . "\n";
echo "　送付先1氏名（フリガナ）：\n";
echo "　送付先1郵便番号：" . $order->get_shipping_postcode() . "\n";
echo "　送付先1住所：" . $order->get_shipping_city() . "\n";
echo "　送付先1電話番号：" . get_post_meta($order->get_id(), 'shipping_phone', true ) . "\n";
echo "　送付先1のし・ギフト包装：\n";
echo "　送付先1お届け方法：" . $order->get_shipping_method() . "\n";
echo "　送付先1お届け希望日：\n";
echo "　送付先1お届け希望時間：\n";
echo "■通信欄\n";
echo $order->get_customer_note();
echo "\n";
