<?php
/**
 * Plugin Name: LVIVSKA MMXXII
 * Author: Damian Kress
 * Author URI: https://www.damiankress.de/
 * Description:
 * Version: 0.0.1
 * Requires at least: 5.9.3
 * Tested up to: 6.0
 * Requires PHP: 8.0
 * License: GNU General Public License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: dkress/lvivska-mmxxii
 * This theme, like WordPress, is licensed under the GPL.
 * Use it to make something cool, have fun, and share what you've learned with others.
 */

define('LV_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once dirname(__FILE__) . '/inc/admin-orders.php';
require_once dirname(__FILE__) . '/inc/custom-rest.php';

LvivskaPlugin::instance();
AdminOrders::instance();
CustomRest::instance();

class LvivskaPlugin {
	private static ?self $instance = null;

	public function __construct() {
		self::$instance = $this;
		add_action('init', [$this, 'init']);
		add_action('after_setup_theme', [$this, 'theme_setup']);
		add_action('acf/init', [$this, 'register_acf_groups']);
		add_action('acf/init', [$this, 'register_store_settings_page']);
		add_action('save_post', [$this, 'revalidate_frontend_routes'], 10, 3);
	}

	public static function instance(): self {
		if (!self::$instance) self::$instance = new self();
		return self::$instance;
	}

	public function init() {
		register_post_type('product', [
			"hierarchical" => false,
			"label"        => __("Products"),
			"menu_icon"    => "dashicons-tag",
			"public"       => true,
			"rest_base"    => "products",
			"show_in_rest" => true,
			"supports"     => [
				"editor",
				"page-attributes",
				"revisions",
				"thumbnail",
				"title",
			],
		]);
		register_nav_menus(
			[
				'main-menu' => __('Main Menu'),
			]
		);
	}

	public function theme_setup() {
		add_theme_support('post-thumbnails', ['page', 'product']);
	}

	public function register_store_settings_page() {
		if (function_exists('acf_add_options_sub_page')) {
			acf_add_options_sub_page(
				[
					//'capability'  => 'publish_products',
					'menu_title'  => __('Store Settings'),
					'page_title'  => __('LVIVSKA Store Settings'),
					//'parent_slug' => 'edit.php?post_type=warning-product',
					'parent_slug' => 'index.php',
				]
			);
		}
	}

	public function register_acf_groups() {
		if( function_exists('acf_add_local_field_group') ):

			acf_add_local_field_group(array(
				'key' => 'group_62f006c11aff9',
				'title' => 'Produktdetails',
				'fields' => array(
					array(
						'key' => 'field_62f171eab9b19',
						'label' => 'SKU',
						'name' => 'sku',
						'type' => 'text',
						'instructions' => '',
						'required' => 1,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'maxlength' => '',
					),
					array(
						'key' => 'field_62f0073cbeb1d',
						'label' => 'Preis',
						'name' => 'price',
						'type' => 'number',
						'instructions' => '',
						'required' => 1,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '€',
						'min' => 3,
						'max' => '',
						'step' => '',
					),
					array(
						'key' => 'field_62f006cdbeb1c',
						'label' => 'Füllmenge',
						'name' => 'capacity',
						'type' => 'number',
						'instructions' => '',
						'required' => 1,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => 'l',
						'min' => -1,
						'max' => '',
						'step' => '0.25',
					),
					array(
						'key' => 'field_62f7e0c862c0e',
						'label' => 'Lieferzeit',
						'name' => 'deliveryTime',
						'type' => 'text',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'maxlength' => '',
					),
					array(
						'key' => 'field_62f00766beb1e',
						'label' => 'Lagerbestand',
						'name' => 'stock',
						'type' => 'number',
						'instructions' => '',
						'required' => 1,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'min' => 0,
						'max' => '',
						'step' => '',
					),
					array(
						'key' => 'field_62f00782beb1f',
						'label' => 'Gewicht',
						'name' => 'weight',
						'type' => 'number',
						'instructions' => '',
						'required' => 1,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => 'kg',
						'min' => 0,
						'max' => '',
						'step' => 11,
					),
					array(
						'key' => 'field_62f007ddbeb20',
						'label' => 'Abmessungen',
						'name' => 'dimensions',
						'type' => 'group',
						'instructions' => '',
						'required' => 0,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'layout' => 'block',
						'sub_fields' => array(
							array(
								'key' => 'field_62f00805beb21',
								'label' => 'Breite',
								'name' => 'width',
								'type' => 'number',
								'instructions' => '',
								'required' => 1,
								'conditional_logic' => 0,
								'wrapper' => array(
									'width' => '',
									'class' => '',
									'id' => '',
								),
								'default_value' => '',
								'placeholder' => '',
								'prepend' => '',
								'append' => 'cm',
								'min' => 0,
								'max' => '',
								'step' => '',
							),
							array(
								'key' => 'field_62f0082ebeb22',
								'label' => 'Höhe',
								'name' => 'height',
								'type' => 'number',
								'instructions' => '',
								'required' => 1,
								'conditional_logic' => 0,
								'wrapper' => array(
									'width' => '',
									'class' => '',
									'id' => '',
								),
								'default_value' => '',
								'placeholder' => '',
								'prepend' => '',
								'append' => 'cm',
								'min' => 0,
								'max' => '',
								'step' => '',
							),
							array(
								'key' => 'field_62f0083ebeb23',
								'label' => 'Tiefe',
								'name' => 'depth',
								'type' => 'number',
								'instructions' => '',
								'required' => 1,
								'conditional_logic' => 0,
								'wrapper' => array(
									'width' => '',
									'class' => '',
									'id' => '',
								),
								'default_value' => '',
								'placeholder' => '',
								'prepend' => '',
								'append' => 'cm',
								'min' => 0,
								'max' => '',
								'step' => '',
							),
						),
					),
				),
				'location' => array(
					array(
						array(
							'param' => 'post_type',
							'operator' => '==',
							'value' => 'product',
						),
					),
				),
				'menu_order' => 0,
				'position' => 'side',
				'style' => 'default',
				'label_placement' => 'top',
				'instruction_placement' => 'label',
				'hide_on_screen' => '',
				'active' => true,
				'description' => '',
				'show_in_rest' => 1,
			));
			
			acf_add_local_field_group(array(
				'key' => 'group_62f0087bc6141',
				'title' => 'Produktinformation',
				'fields' => array(
					array(
						'key' => 'field_62f00885a11b5',
						'label' => 'Untertitel',
						'name' => 'subtitle',
						'type' => 'text',
						'instructions' => '',
						'required' => 1,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'maxlength' => '',
					),
				),
				'location' => array(
					array(
						array(
							'param' => 'post_type',
							'operator' => '==',
							'value' => 'product',
						),
					),
				),
				'menu_order' => 0,
				'position' => 'acf_after_title',
				'style' => 'default',
				'label_placement' => 'top',
				'instruction_placement' => 'label',
				'hide_on_screen' => '',
				'active' => true,
				'description' => '',
				'show_in_rest' => 1,
			));
			
			acf_add_local_field_group(array(
				'key' => 'group_62f00c411b665',
				'title' => 'Store settings',
				'fields' => array(
					array(
						'key' => 'field_62f00c5a273e3',
						'label' => 'Mehrwertsteuer',
						'name' => 'mwst',
						'type' => 'number',
						'instructions' => '',
						'required' => 1,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '33',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '%',
						'min' => 0,
						'max' => '',
						'step' => '',
					),
					array(
						'key' => 'field_62f760800ae0b',
						'label' => 'Lieferkosten',
						'name' => 'shipping_rate',
						'type' => 'number',
						'instructions' => '',
						'required' => 1,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '33',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '€',
						'min' => 0,
						'max' => '',
						'step' => '0.5',
					),
					array(
						'key' => 'field_62f760ae0ae0c',
						'label' => 'Gratis Lieferung ab',
						'name' => 'free_shipping_from',
						'type' => 'number',
						'instructions' => '',
						'required' => 1,
						'conditional_logic' => 0,
						'wrapper' => array(
							'width' => '33',
							'class' => '',
							'id' => '',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '€',
						'min' => 0,
						'max' => '',
						'step' => '',
					),
				),
				'location' => array(
					array(
						array(
							'param' => 'options_page',
							'operator' => '==',
							'value' => 'acf-options-store-settings',
						),
					),
				),
				'menu_order' => 0,
				'position' => 'normal',
				'style' => 'seamless',
				'label_placement' => 'top',
				'instruction_placement' => 'label',
				'hide_on_screen' => '',
				'active' => true,
				'description' => '',
				'show_in_rest' => 1,
			));
			
			endif;
	}

	public function revalidate_frontend_routes(int $post_id, WP_Post $post, bool $update) {
		if ($post->post_type !== ('page' || 'product')) return;
		if ($post->post_status !== 'publish') return;

		$response = file_get_contents(getenv('NEXT_PUBLIC_URL') . '/api/revalidate?secret=' . getenv('REVALIDATE_TOKEN'));
		if ($response) {
			$response = json_decode('response');
			$success = $response['revalidated'];
			if ($success) return true;
		}
		throw new WP_Error('The revalidation was unsuccessful.');
	}
}
