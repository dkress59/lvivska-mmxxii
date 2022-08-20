<?php

class CustomRest {
	private static ?self $instance = null;

	public function __construct() {
		add_action('rest_api_init', [$this, 'register_routes']);
		self::$instance = $this;
	}

	public static function instance(): self {
		if (!self::$instance) self::$instance = new self();
		return self::$instance;
	}

	public function register_routes(): void {
		register_rest_route('lvivska/v1', 'settings', [
			'methods' => 'GET',
			'callback' => [$this, 'get_settings'],
			'permission_callback' => '__return_true',
		]);
		register_rest_route('lvivska/v1', 'stock', [
			'methods' => 'POST',
			'callback' => [$this, 'decrease_stock'],
			'permission_callback' => '__return_true',
		]);
	}

	public function get_settings(): WP_REST_Response {
		$tax = (float) get_field('mwst', 'option');
		$shipping_rate = (float) get_field('shipping_rate', 'option');
		$free_shipping_from = (float) get_field('free_shipping_from', 'option');

		return new WP_REST_Response([
			'mwst' => $tax,
			'shippingRate' => $shipping_rate,
			'freeShippingFrom' => $free_shipping_from,
		]);
	}

	public function decrease_stock(WP_REST_Request $request): WP_REST_Response | WP_Error {
		$parameters = $request->get_json_params();
		if (!isset($parameters['productId'])) {
			return new WP_Error(400, "'productId' parameter missing.", ['status' => 400]);
		}
		if (!isset($parameters['quantity'])) {
			return new WP_Error(400, "'quantity' parameter missing.", ['status' => 400]);
		}

		$product_id = (int) $parameters['productId'];
		$quantity = (int) $parameters['quantity'];

		$current_stock = (int) get_field('stock', $product_id);
		$updated_stock = $current_stock - $quantity >= 0
			? $current_stock - $quantity
			: 0;

		update_field('stock', $updated_stock, $product_id);

		return new WP_REST_Response([
			'productId' => $product_id,
			'stock' => $updated_stock,
		]);
	}
}
