package com.agentwaj.cmdf;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView tvMain = (TextView) findViewById(R.id.tvMain);
        tvMain.setText("Check out my cool new website!");

        WebView wvMain = (WebView) findViewById(R.id.wvMain);
        wvMain.setWebViewClient(new WebViewClient());
        wvMain.loadUrl("http://aaronlandy.herokuapp.com/");
    }
}
