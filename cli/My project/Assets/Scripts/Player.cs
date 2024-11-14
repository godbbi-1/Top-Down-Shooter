using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    [SerializeField]
    private float moveSpeed;   

    [SerializeField]
    private GameObject weapon;

    [SerializeField]
    private Transform shootTransform;
    [SerializeField]
    private float shootInterval = 0.05f;
    private float lastShotTime = 0f;
    void Update()
    {
        // 매 프레임 호출
        // 키보드 제어
        //  float horizontalInput = Input.GetAxisRaw("Horizontal");
        //  float verticalInput = Input.GetAxisRaw("Vertical");
         
        //  Vector3 moveTo = new Vector3(horizontalInput, verticalInput, 0f);
        //  transform.position += moveTo * moveSpeed * Time.deltaTime;

        Vector3 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        float toX = Mathf.Clamp(mousePos.x, -2.35f, 2.35f);
        float toY = Mathf.Clamp(mousePos.y, -4.5f, 4.5f);
        transform.position = new Vector3(toX, toY, 0);

        Shoot();
        
    }
        
        void Shoot () {

            if(Time.time - lastShotTime > shootInterval) {
                Instantiate(weapon, shootTransform.position, Quaternion.identity);
                lastShotTime = Time.time;
            }
            
        }
}
