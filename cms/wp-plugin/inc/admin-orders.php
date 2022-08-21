<?php

class AdminOrders {
	private static ?self $instance = null;

	public function __construct() {
		add_action('acf/init', [$this, 'register_orders_page']);
		add_action('current_screen', [$this, 'add_orders_js']);
		self::$instance = $this;
	}

	public static function instance(): self {
		if (!self::$instance) self::$instance = new self();
		return self::$instance;
	}

	public function register_orders_page() {
		if ( function_exists( 'acf_add_options_page' ) ) {

			acf_add_options_page(
				array(
					'page_title' => 'LVIVSKA Shop Orders',
					'menu_title' => __('Orders'),
					'menu_slug'  => 'orders',
					'redirect'   => false,
					'capability' => 'delete_others_pages',
					'position'   => 26,
					'icon_url'  => 'dashicons-editor-table',
				)
			);
		}
	}

	public function add_orders_js() {
		$current_screen = get_current_screen();
		if ($current_screen->id === 'toplevel_page_orders') {
			wp_enqueue_script('admin-orders', LV_PLUGIN_URL . 'assets/admin-orders.js');
			wp_localize_script('admin-orders', 'auth', [
				'nonce'      => wp_create_nonce('wp_rest'),
			]);
		}
	}
}
