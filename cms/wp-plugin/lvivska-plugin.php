<?php
/**
 * Plugin Name: LVIVSKA MMXXII
 */

LvivskaPlugin::instance();

class LvivskaPlugin {
    private static ?self $instance = null;

    public function __construct() {
        self::$instance = $this;
        add_action('init', [$this, 'setup_post_types']);
    }

    public static function instance(): self {
        if (!self::$instance) self::$instance = new self();
        return self::$instance;
    }

    public function init() {
        add_theme_support('post-thumbnails', ['page', 'product']);
    }

    public function setup_post_types() {
        register_post_type('product', [
            "label" => __("Products"),
            "public" => true,
            "menu_icon" => "dashicons-tag",
            "supports" => ["title", "editor", "thumbnail"],
            "hierarchical" => false,
        ]);
    }
}